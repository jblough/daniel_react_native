import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import {Week} from "@/types/week";
import ScriptureView from "@/components/ScriptureView";
import {usePassageContent} from "@/hooks/usePassageContent";
import PercentageIndicator from "@/components/PercentageIndicator";
import {useEffect, useRef, useState} from "react";
import {NativeSyntheticEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {NativeScrollEvent} from "react-native/Libraries/Components/ScrollView/ScrollView";
import {useAudioPlayer, useAudioPlayerStatus} from "expo-audio";
import Animated, {FadeInUp, FadeOutUp} from "react-native-reanimated";
import AudioPlayerControls from "@/components/AudioPlayerControls";

interface PassageProps {
    week: Week;
}

const PassageScreen = ({week}: PassageProps) => {
    const {content, loading} = usePassageContent(week);

    const player = useAudioPlayer();
    const status = useAudioPlayerStatus(player);

    const [percentageComplete, setPercentageComplete] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({y: 0, animated: false});
    }, [week]);

    const playAudio = (href: string) => {
        player.replace({uri: href});
        player.play();
    }

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

    if (loading) {
        return <ActivityIndicator/>;
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
                <ScriptureView html={content} playAudio={playAudio}/>
            </ScrollView>
            <View style={styles.percentIndicator}>
                <PercentageIndicator percentage={percentageComplete}/>
            </View>
            <View style={styles.weekIndicator}>
                <Text>Week {week.weekNumber}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 10,
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

export default PassageScreen;