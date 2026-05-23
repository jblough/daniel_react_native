import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Week} from "@/types/week";
import {readingPlan} from "@/constants/readingPlan";

export interface SelectedWeekSlice {
    week: Week;
}

const initialState: SelectedWeekSlice = {
    week: readingPlan[0]
};

export const selectedWeekSlice = createSlice({
    name: "selected-week",
    initialState: initialState,
    reducers: {
        setWeek: (state, action: PayloadAction<Week>) => {
            state.week = action.payload;
        }
    }
});

export const {setWeek} = selectedWeekSlice.actions;

export default selectedWeekSlice.reducer;