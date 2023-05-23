import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initialState = null
const restSlice = createSlice({
    name: 'rest',
    initialState,
    reducers: {
        setRest: (state, { payload }) => (payload),
        setRestId: (state, { payload }) => ({ id: payload }),
        deleteRest: () => initialState
    }
})

export const { setRest, setRestId, deleteRest } = restSlice.actions
export const getRestSelector = (state) => state.rest
export const restReducer = persistReducer({
    key: 'rtk:rest',
    storage
}, restSlice.reducer);