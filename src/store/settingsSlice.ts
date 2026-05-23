import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Settings, ThemeMode} from "@/types/settings";

const initialState: Settings = {
    themeMode: ThemeMode.system,
    fontSize: 14,
}
export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.themeMode = action.payload;
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload;
        }
    }
});

export const {setThemeMode, setFontSize} = settingsSlice.actions;

export default settingsSlice.reducer;