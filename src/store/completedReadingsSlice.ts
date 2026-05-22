import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CompletedReadingsState {
    completedReadings: Set<string>;
}

const initialState: CompletedReadingsState = {
    completedReadings: new Set(),
}

export const completedReadingsSlice = createSlice({
    name: "completed-readings",
    initialState: initialState,
    reducers: {
        completeReading: (state, action: PayloadAction<string>) => {
            state.completedReadings.add(action.payload);
        },
        uncompleteReading: (state, action: PayloadAction<string>) => {
            state.completedReadings.delete(action.payload);
        },
    }
});

export const {completeReading, uncompleteReading} = completedReadingsSlice.actions;

export default completedReadingsSlice.reducer;