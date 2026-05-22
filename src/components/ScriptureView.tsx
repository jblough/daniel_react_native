import {
    Alert,
    type GestureResponderEvent,
    Platform,
    ScrollView,
    StyleSheet,
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

interface ScriptureViewProps {
    week: Week;
    html: string;
}

const ScriptureView = (props: ScriptureViewProps) => {
    const player = useAudioPlayer();
    const status = useAudioPlayerStatus(player);
    const settings = useSelector((state: RootState) => state.settings);

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

    const {width} = useWindowDimensions();

    const showAudioControls = !status.didJustFinish && status.duration > 0 && (status.playing || (status.timeControlStatus === "paused" && status.currentTime > 0));

    return (
        <View style={styles.container}>
            {showAudioControls &&
                <Animated.View style={styles.audioPlayerControls} entering={FadeInUp} exiting={FadeOutUp}>
                    <AudioPlayerControls player={player} status={status}/>
                </Animated.View>}
            <ScrollView style={styles.scroll}>
                <RenderHtml
                    contentWidth={width}
                    source={{html: props.html}}
                    baseStyle={{fontSize: settings.fontSize}}
                    renderersProps={renderersProps}
                    ignoredDomTags={["note"]}
                /></ScrollView>
        </View>
    );
};

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
    }
});

export default ScriptureView;