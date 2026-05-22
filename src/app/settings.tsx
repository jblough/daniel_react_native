import {Stack} from "expo-router";
import {Text, View} from "react-native";

const SettingsScreen = () => {
    return (
        <Stack.Screen options={{
            headerShown: true,
            title: "Settings"
        }}>
            <View>
                <Text>Settings</Text>
            </View>
        </Stack.Screen>
    );
}

export default SettingsScreen;