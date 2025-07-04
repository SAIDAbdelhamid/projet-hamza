import AsyncStorage from "@react-native-async-storage/async-storage";
import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {persistReducer, persistStore} from "redux-persist";

import registrationReducer from "./slices/registrationSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["registration"],
};

const rootReducer = combineReducers({
  registration: registrationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
