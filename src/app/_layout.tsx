import {SafeAreaProvider} from "react-native-safe-area-context";
import {Stack} from "expo-router";
import {persistor, store} from "@/store/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {ActivityIndicator, StyleSheet, View} from "react-native";


export default function RootLayout() {
    return <SafeAreaProvider>
        <Provider store={store}>
            <PersistGate
                loading={
                    <View style={styles.busy}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                }
                persistor={persistor}>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="index"/>
                </Stack>
            </PersistGate>
        </Provider>
    </SafeAreaProvider>;
}

const styles = StyleSheet.create({
    busy: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});