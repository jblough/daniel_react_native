import {SafeAreaProvider} from "react-native-safe-area-context";
import {Stack, useRouter} from "expo-router";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Drawer} from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";


export default function RootLayout() {
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

    // Drawer layout
    return <SafeAreaProvider>
        <Provider store={store}>
            <Drawer screenOptions={{
                headerShown: true,
                headerTitle: "Summer of Daniel",
                headerTitleAlign: "center"
            }}
                    drawerContent={(props) => <CustomDrawer {...props}/>}
            >
                <Drawer.Screen name="index" options={{title: "Home"}}/>
            </Drawer></Provider>
    </SafeAreaProvider>;

    // Stack layout
    return <SafeAreaProvider>
        <Provider store={store}>
            <Stack screenOptions={{headerShown: false}}>
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
                }} name="index"/>
            </Stack>
        </Provider>
    </SafeAreaProvider>;
}
