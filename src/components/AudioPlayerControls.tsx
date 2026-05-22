import {TouchableOpacity, View} from "react-native";
import {AudioPlayer, AudioStatus} from "expo-audio";
import Ionicons from "@expo/vector-icons/Ionicons"

interface AudioPlayerControlsProps {
    player: AudioPlayer;
    status: AudioStatus;
}

const AudioPlayerControls = ({player, status}: AudioPlayerControlsProps) => {
    const size = 24;
    const color = "#777";
    const style = {paddingHorizontal: 15};

    return (
        <View
            style={{flexDirection: "row", justifyContent: "space-between"}}>
            <TouchableOpacity onPress={() => player.seekTo(0)}>
                <Ionicons style={style} name={"play-skip-back"} size={size} color={color}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => player.seekTo(-5)}>
                <Ionicons style={style} name={"play-back"} size={size} color={color}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                player.pause();
                void player.seekTo(0);
            }}>
                <Ionicons style={style} name={"stop"} size={size} color={color}/>
            </TouchableOpacity>

            {status.timeControlStatus === "playing" &&
                <TouchableOpacity onPress={() => player.pause()}>
                    <Ionicons style={style} name={"pause"} size={size} color={color}/>
                </TouchableOpacity>
            }

            {status.timeControlStatus === "paused" &&
                <TouchableOpacity onPress={() => player.play()}>
                    <Ionicons style={style} name={"play"} size={size} color={color}/>
                </TouchableOpacity>
            }

            <TouchableOpacity onPress={() => player.seekTo(5)}>
                <Ionicons style={style} name={"play-forward"} size={size} color={color}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => player.seekTo(status.duration - 5)}>
                <Ionicons style={style} name={"play-skip-forward"} size={size} color={color}/>
            </TouchableOpacity>
        </View>
    );
}

export default AudioPlayerControls;