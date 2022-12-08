import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initialState = { locale: "en" }
const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        setLocale: (state, { payload }) => (payload)
    }
})

export const { setLocale } = localeSlice.actions
export const getLocaleSelector = (state) => state.localeReducer.locale
export const localeReducer = persistReducer({
    key: 'rtk:locale',
    storage
}, localeSlice.reducer);