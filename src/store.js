import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import modalSlice from "./features/modal/modalSlice";
import videosSlice from "./features/videos/videosSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer,
        modal: modalSlice.reducer,
        videos: videosSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: import.meta.env.DEV,
});
