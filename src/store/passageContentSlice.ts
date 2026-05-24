import {createSlice} from '@reduxjs/toolkit';
import {fetchPassageContent} from "@/store/passageContentThunks";
import {Passage} from "@/types/passage";

interface PassageContentSliceState {
    paths: Record<number, string>;
    loading: boolean;
};

const initialState: PassageContentSliceState = {
    paths: {},
    loading: false,
}

const passageContentSlice = createSlice({
    name: "passage-content",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPassageContent.fulfilled, (state, action) => {
            const {weekNumber, content} = action.payload;
            if (content) {
                const passage: Passage = JSON.parse(content);
                state.paths[weekNumber] = passage?.passages?.join();
            }
        })
    },
});

export default passageContentSlice;