import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Settings, ThemeMode} from "@/types/settings";

const initialState: Settings = {
    mode: ThemeMode.system,
    fontSize: 14,
}
export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload;
        }
    }
});

export const {setMode, setFontSize} = settingsSlice.actions;

export default settingsSlice.reducer;