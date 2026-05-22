import {StyleSheet, TouchableOpacity, View} from "react-native";
import PassageScreen from "@/screens/PassageScreen";
import {readingPlan} from "@/constants/reading_plan";
import {Stack, useRouter} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
    const router = useRouter();

    function openMenu() {
        // TODO: Put the side menu back
    }

    function showVideo() {
        router.push("/video");
    }

    function goToSettings() {
        router.push("/settings");
    }

    return (
        <Stack.Screen options={{
            headerShown: true,
            headerTitle: "Summer of Daniel",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity onPress={openMenu}>
                    <Ionicons style={{paddingHorizontal: 10}} name={"menu"} size={24} color="#777"/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={showVideo}>
                        <Ionicons style={{paddingHorizontal: 5}} name={"videocam"} size={24} color="#777"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToSettings}>
                        <Ionicons style={{paddingHorizontal: 10}} name={"settings"} size={24} color="#777"/>
                    </TouchableOpacity>
                </View>
            ),
        }}>
            <View style={styles.container}>
                <PassageScreen week={readingPlan[1]}/>
            </View>
        </Stack.Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
