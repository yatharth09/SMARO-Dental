import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";


import authReducer from "./reducers/auth.slice";
import settingsReducer from "./reducers/settings.slice";
import searchReducer from "./reducers/search.slice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "settings","template"]
}
const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    search:searchReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export type RootStateProps = ReturnType<typeof rootReducer>;
