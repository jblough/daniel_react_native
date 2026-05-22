import {configureStore} from "@reduxjs/toolkit";
import {passagesSlice} from "@/store/passagesSlice";
import {settingsSlice} from "@/store/settingsSlice";
import {completedReadingsSlice} from "@/store/completedReadingsSlice";
import passageContentSlice from "@/store/passageContentSlice";

export const store = configureStore({
    reducer: {
        completeReadings: completedReadingsSlice.reducer,
        passageContent: passageContentSlice,
        passages: passagesSlice.reducer,
        settings: settingsSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
