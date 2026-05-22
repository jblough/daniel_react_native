import {configureStore} from "@reduxjs/toolkit";
import {settingsSlice} from "@/store/settingsSlice";
import {completedReadingsSlice} from "@/store/completedReadingsSlice";
import passageContentSlice from "@/store/passageContentSlice";
import {selectedWeekSlice} from "@/store/selectedWeekSlice";

export const store = configureStore({
    reducer: {
        completeReadings: completedReadingsSlice.reducer,
        passageContent: passageContentSlice,
        selectedWeek: selectedWeekSlice.reducer,
        settings: settingsSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
