import { configureStore } from "@reduxjs/toolkit";
import { mainSliceApi } from "../features/main/main-api-slice";

export const store = configureStore({
    reducer: {
        [mainSliceApi.reducerPath]: mainSliceApi.reducer,
    },
    middleware: (getDefaultMiddle) => {
        return getDefaultMiddle().concat(mainSliceApi.middleware)
    }
})

