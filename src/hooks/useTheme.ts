import {useAppSelector} from "@/hooks/hooks";
import {useEffect, useState} from "react";
import {darkTheme, lightTheme, ThemeColors} from "@/constants/theme";
import {ThemeMode} from "@/types/settings";
import {Appearance} from 'react-native';


export const useTheme = () => {
    const theme = useAppSelector(state => state.settings.themeMode);
    const [colors, setColors] = useState<ThemeColors>(lightTheme);

    useEffect(() => {
        switch (theme) {
            case ThemeMode.system:
                const colors = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
                setColors(colors);
                break;
            case ThemeMode.dark:
                setColors(darkTheme);
                break;
            case ThemeMode.light:
                setColors(lightTheme);
                break;
        }

    }, [theme]);

    return {colors};
};