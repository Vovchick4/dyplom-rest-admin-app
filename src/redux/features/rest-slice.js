import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initialState = null
const restSlice = createSlice({
    name: 'rest',
    initialState,
    reducers: {
        setRest: (state, { payload }) => (payload)
    }
})

export const { setRest } = restSlice.actions
export const getRestSelector = (state) => state.restReducer
export const restReducer = persistReducer({
    key: 'rtk:rest',
    storage
}, restSlice.reducer);