import { configureStore } from "@reduxjs/toolkit";
import TypeReducer from "./TypeReducer";
import FuncReducer from "./FuncReducer";

export const store = configureStore({
    reducer: {
        type: TypeReducer,
        func: FuncReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;