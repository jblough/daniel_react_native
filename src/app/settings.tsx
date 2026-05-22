import {Stack, useRouter} from "expo-router";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import type {RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import {setFontSize} from "@/store/settingsSlice";

const SettingsScreen = () => {
    const router = useRouter();

    const settings = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();

    return (
        <Stack.Screen options={{headerShown: true, title: "Settings"}}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    router.push("/licensing");
                }}>
                    <Text>Licensing details</Text>
                </TouchableOpacity>

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.sectionTitle}>Font Size:</Text>
                    <Text style={styles.sectionTitle}>(sample text)</Text>
                </View>
                <Text style={[styles.sampleText, {fontSize: settings.fontSize}]}>
                    &quot;In the third year of the reign&quot;
                </Text>
                <Slider
                    style={{width: "100%", height: 40}}
                    minimumValue={10}
                    maximumValue={34}
                    onValueChange={(value) => {
                        dispatch(setFontSize(Math.round(value)));
                    }}
                    value={settings.fontSize}
                />
            </View>
        </Stack.Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    button: {
        width: "100%",
        backgroundColor: "#ddd",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
    },
    sectionTitle: {
        paddingTop: 20,
    },
    sampleText: {
        height: 40,
        overflow: "hidden",
        paddingVertical: 10
    }
});

export default SettingsScreen;