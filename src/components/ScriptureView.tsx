import {
    Alert,
    type GestureResponderEvent,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import RenderHtml from 'react-native-render-html';
import {Week} from "@/types/week";
import {useAudioPlayer, useAudioPlayerStatus} from "expo-audio";
import AudioPlayerControls from "@/components/AudioPlayerControls";
import Animated, {FadeInUp, FadeOutUp} from "react-native-reanimated";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store";
import {NativeSyntheticEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {NativeScrollEvent} from "react-native/Libraries/Components/ScrollView/ScrollView";
import PercentageIndicator from "@/components/PercentageIndicator";
import {memo, useEffect, useRef, useState} from 'react';

interface ScriptureViewProps {
    week: Week;
    html: string;
}

const ScriptureView = memo(function ScriptureView({week, html}: ScriptureViewProps) {
    const player = useAudioPlayer();
    const status = useAudioPlayerStatus(player);
    const settings = useSelector((state: RootState) => state.settings);
    const {width} = useWindowDimensions();
    const [percentageComplete, setPercentageComplete] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({y: 0, animated: false});
    }, [week]);

    function onPress(_: GestureResponderEvent,
                     href: string,
                     htmlAttribs: Record<string, string>) {
        if (href.endsWith('mp3')) {
            player.replace({uri: href});
            player.play();
        }

        const linkTitle = htmlAttribs["title"];
        if (linkTitle && htmlAttribs["type"] !== "audio/mpeg") {
            if (Platform.OS === 'web') {
                alert(linkTitle);
            } else {
                Alert.alert(linkTitle);
            }
        }
    }

    const renderersProps = {a: {onPress}};

    const showAudioControls = !status.didJustFinish && status.duration > 0 && (status.playing || (status.timeControlStatus === "paused" && status.currentTime > 0));

    if (status.playing && contentHeight && scrollRef.current) {
        const audioPercentageDone = status.currentTime / status.duration;
        const scrollPosition = audioPercentageDone * (contentHeight - 200);

        scrollRef.current?.scrollTo({y: scrollPosition, animated: true});
    }

    function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const offset = event.nativeEvent.contentOffset.y;
        const inset = event.nativeEvent.layoutMeasurement.height;
        const size = event.nativeEvent.contentSize.height;
        const percentageScrolled = offset / (size - inset) * 100;
        setPercentageComplete(Math.round(percentageScrolled));
    }

    function onContentSizeChange(_: number, height: number) {
        setContentHeight(height);
    }

    return (
        <View style={styles.container}>
            {showAudioControls &&
                <Animated.View style={styles.audioPlayerControls} entering={FadeInUp} exiting={FadeOutUp}>
                    <AudioPlayerControls player={player} status={status}/>
                </Animated.View>}
            <ScrollView
                style={styles.scroll}
                onScroll={onScroll}
                scrollEventThrottle={64}
                ref={scrollRef}
                onContentSizeChange={onContentSizeChange}
            >
                <RenderHtml
                    contentWidth={width}
                    source={{html: html}}
                    baseStyle={{fontSize: settings.fontSize}}
                    renderersProps={renderersProps}
                    ignoredDomTags={["note"]}
                />
            </ScrollView>
            <View style={styles.percentIndicator}>
                <PercentageIndicator percentage={percentageComplete}/>
            </View>
            <View style={styles.weekIndicator}>
                <Text>Week {week.weekNumber}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "stretch"
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 10,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    audioPlayerControls: {
        width: "100%",
        paddingVertical: 10,
        justifyContent: "center",
        alignContent: "stretch",
        alignSelf: "stretch",
    },
    percentIndicator: {
        position: "absolute",
        end: 20,
        bottom: 30,
    },
    weekIndicator: {
        position: "absolute",
        alignSelf: "center",
        backgroundColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        bottom: 10,
    },
});

export default ScriptureView;