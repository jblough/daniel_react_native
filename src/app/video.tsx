import {useEvent} from 'expo';
import {useVideoPlayer, VideoView} from 'expo-video';
import {Button, StyleSheet, View} from 'react-native';
import {Stack} from "expo-router";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store";
import {useTheme} from "@/hooks/useTheme";

const VideoScreen = () => {
    const themeColors = useTheme();
    const selectedWeek = useSelector((state: RootState) => state.selectedWeek);
    const videoSource = selectedWeek.week.videoUrl;

    const player = useVideoPlayer(videoSource, player => {
        player.loop = false;
        player.play();
    });

    const {isPlaying} = useEvent(player, 'playingChange', {isPlaying: player.playing});

    return (
        <Stack.Screen options={{
            headerShown: true,
            title: "Sermon Video",
            headerStyle: {backgroundColor: themeColors.colors.header},
            headerTintColor: themeColors.colors.button,
        }}>
            <View style={[styles.contentContainer, {backgroundColor: themeColors.colors.background}]}>
                <VideoView
                    style={styles.video}
                    player={player}
                    fullscreenOptions={{enable: true}}
                    allowsPictureInPicture
                />
                <View style={styles.controlsContainer}>
                    <Button
                        title={isPlaying ? 'Pause' : 'Play'}
                        onPress={() => {
                            if (isPlaying) {
                                player.pause();
                            } else {
                                player.play();
                            }
                        }}
                    />
                </View>
            </View>
        </Stack.Screen>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});

export default VideoScreen;