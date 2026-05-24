import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore,} from 'redux-persist';
import {settingsSlice} from "@/store/settingsSlice";
import {completedReadingsSlice} from "@/store/completedReadingsSlice";
import passageContentSlice from "@/store/passageContentSlice";
import {selectedWeekSlice} from "@/store/selectedWeekSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from "redux-persist/lib/storage";
import {Platform} from "react-native";

const selectStorage = () => {
    if (Platform.OS === 'web') {
        return storage;
    }
    return AsyncStorage;
};

const rootReducer = combineReducers({
    completeReadings: completedReadingsSlice.reducer,
    passageContent: passageContentSlice.reducer,
    selectedWeek: selectedWeekSlice.reducer,
    settings: settingsSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage: selectStorage(),
    whitelist: ['settings', 'completeReadings', 'selectedWeek'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
