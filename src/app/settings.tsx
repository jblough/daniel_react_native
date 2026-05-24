import {Stack, useRouter} from "expo-router";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import type {RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import {setFontSize, setThemeMode} from "@/store/settingsSlice";
import {ThemeMode} from "@/types/settings";
import {useTheme} from "@/hooks/useTheme";
import {ThemeColors} from "@/constants/theme";

const SettingsScreen = () => {
    const router = useRouter();

    const fontSize = useSelector((state: RootState) => state.settings.fontSize);
    const theme = useSelector((state: RootState) => state.settings.themeMode);
    const themeColors = useTheme();

    const dispatch = useDispatch();

    const unselectedColor = "#999";
    const selectedColor = "#0dd";

    const themeModeButton = (themeMode: ThemeMode, label: string) => {
        return <Button color={theme === themeMode ? selectedColor : unselectedColor} title={label}
                       onPress={() => dispatch(setThemeMode(themeMode))}/>;
    }

    const styles = getStyles(themeColors.colors);

    return (
        <Stack.Screen
            options={{
                headerShown: true,
                title: "Settings",
                headerStyle: {backgroundColor: themeColors.colors.header},
                headerTintColor: themeColors.colors.button,
            }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    router.push("/licensing");
                }}>
                    <Text style={{color: themeColors.colors.background}}>Licensing details</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Theme:</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    {themeModeButton(ThemeMode.system, "System")}
                    {themeModeButton(ThemeMode.light, "Light")}
                    {themeModeButton(ThemeMode.dark, "Dark")}
                </View>

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.sectionTitle}>Font Size:</Text>
                    <Text style={styles.sectionTitle}>(sample text)</Text>
                </View>
                <Text style={[styles.sampleText, {fontSize: fontSize}]}>
                    &quot;In the third year of the reign&quot;
                </Text>
                <Slider
                    style={{width: "100%", height: 40}}
                    minimumValue={10}
                    maximumValue={34}
                    onValueChange={(value) => {
                        dispatch(setFontSize(Math.round(value)));
                    }}
                    value={fontSize}
                />
            </View>
        </Stack.Screen>
    );
}

function getStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: colors.background,
        },
        button: {
            width: "100%",
            backgroundColor: colors.button,
            alignItems: "center",
            padding: 10,
            borderRadius: 8,
        },
        sectionTitle: {
            paddingTop: 20,
            color: colors.text,
        },
        sampleText: {
            height: 40,
            overflow: "hidden",
            paddingVertical: 10,
            color: colors.text,
        }
    });
}

export default SettingsScreen;