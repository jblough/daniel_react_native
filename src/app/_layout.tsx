import {SafeAreaProvider} from "react-native-safe-area-context";
import {Stack} from "expo-router";
import {store} from "@/store/store";
import {Provider} from "react-redux";


export default function RootLayout() {
    return <SafeAreaProvider>
        <Provider store={store}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index"/>
            </Stack>
        </Provider>
    </SafeAreaProvider>;
}
