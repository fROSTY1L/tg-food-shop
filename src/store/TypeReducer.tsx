import { createSlice } from "@reduxjs/toolkit"

interface InputState {
    typeValue: string;
}

const initialState: InputState = {
    typeValue: ''
}

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        setTypeValue: (state, action) => {
            state.typeValue = action.payload
        },
    },
})

export const { setTypeValue } = typeSlice.actions;
export default typeSlice.reducer
