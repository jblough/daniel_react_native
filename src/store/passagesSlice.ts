import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Passage} from "@/types/passage";

export interface PassagesState {
    passages: Passage[];
};

const initialState: PassagesState = {
    passages: []
};

export const passagesSlice = createSlice({
    name: "passages",
    initialState: initialState,
    reducers: {
        addPassage: (state, action: PayloadAction<Passage>) => {
            state.passages.push(action.payload);
        }
    },
});

export const {addPassage} = passagesSlice.actions;

export default passagesSlice.reducer;