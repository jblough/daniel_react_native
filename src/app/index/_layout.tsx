import {useRouter} from 'expo-router';
import {TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {Drawer} from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";

export default function HomeLayout() {
    const router = useRouter();

    function showVideo() {
        router.push("/video");
    }

    function goToSettings() {
        router.push("/settings");
    }

    return <SafeAreaProvider>
        <Provider store={store}>
            <Drawer screenOptions={{
                headerShown: true,
                headerTitle: "Summer of Daniel",
                headerTitleAlign: "center",
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
            }}
                    drawerContent={(props) => <CustomDrawer {...props}/>}
            >
                <Drawer.Screen name="index" options={{title: "Home"}}/>
            </Drawer></Provider>
    </SafeAreaProvider>;
}
