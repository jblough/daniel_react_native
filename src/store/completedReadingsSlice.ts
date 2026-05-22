import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CompletedReadingsState {
    completedReadings: string[];
}

const initialState: CompletedReadingsState = {
    completedReadings: [],
}

export const completedReadingsSlice = createSlice({
    name: "completed-readings",
    initialState: initialState,
    reducers: {
        completeReading: (state, action: PayloadAction<string>) => {
            state.completedReadings.push(action.payload);
        },
        uncompleteReading: (state, action: PayloadAction<string>) => {
            state.completedReadings = state.completedReadings.filter((item) => item !== action.payload);
        },
    }
});

export const {completeReading, uncompleteReading} = completedReadingsSlice.actions;

export default completedReadingsSlice.reducer;