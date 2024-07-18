import { createSlice } from "@reduxjs/toolkit"

interface funcState {
    funcValue: string;
}

const initialState: funcState = {
    funcValue: '1'
}

const funcSlice = createSlice({
    name: 'func',
    initialState,
    reducers: {
        setFuncValue: (state, action) => {
            state.funcValue = action.payload
        },
    },
})

export const { setFuncValue } = funcSlice.actions;
export default funcSlice.reducer
