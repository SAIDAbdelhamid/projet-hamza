import AsyncStorage from "@react-native-async-storage/async-storage";
import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {persistReducer, persistStore} from "redux-persist";

import registrationReducer from "./slices/registrationSlice";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["registration", "user"],
};

const rootReducer = combineReducers({
  registration: registrationReducer,
  user: userReducer,
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
