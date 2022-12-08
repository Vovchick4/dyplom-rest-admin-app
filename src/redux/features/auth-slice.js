import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initialState = {
    user: null,
    token: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, { payload }) => {
            return {
                ...state,
                user: payload
            }
        },
        setToken: (state, { payload }) => {
            return {
                ...state,
                token: payload
            }
        },
    }
})

export const { logout, setUser, setToken } = authSlice.actions
export const getUserSelector = (state) => state.auth.user
export const getIsAuthenticated = (state) => !!state.auth.token
export const authReducer = persistReducer({
    key: 'rtk:auth',
    storage
}, authSlice.reducer);