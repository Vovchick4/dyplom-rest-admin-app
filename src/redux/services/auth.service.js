import { createApi } from '@reduxjs/toolkit/query/react'

import { toast } from 'react-toastify'
import { getErrorMessage } from '../../utils/getErrorMessage'
import { logout, setUser, setToken } from '../features/auth-slice'
import { fetchBaseUrl } from './helpers'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseUrl,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data.data))
                    dispatch(setToken(data.token))
                    toast.success(data.message)
                } catch ({ error }) {
                    dispatch(logout())
                    toast.error(getErrorMessage(error))
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data.data))
                    dispatch(setToken(data.token))
                    toast.success(data.message)
                } catch ({ error }) {
                    dispatch(logout())
                    toast.error(getErrorMessage(error))
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                queryFulfilled
                    // Error with Parse JSON
                    .then(res => {
                        dispatch(logout())
                        toast.success(res.data.message)
                    })
                    .catch(({ error }) => {
                        toast.error(getErrorMessage(error))
                    })
            }
        }),
        resetUserPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/password/reset',
                method: 'POST',
                body: {
                    email
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                queryFulfilled
                    // Error with Parse JSON
                    .then(res => {
                        toast.success(res.data.message)
                    })
                    .catch(({ error }) => {
                        toast.error(getErrorMessage(error))
                    })
            }
        }),
        getUser: builder.query({
            query: () => ({
                url: '/auth/get-user',
            }),
            providesTags: ["Auth"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data.data))
                    toast.success(data.message)
                } catch ({ error }) {
                    dispatch(logout())
                    toast.error("Unauthenticated");
                }
            },
        })
    }),
})

// Exports Hooks
export const { useGetUserQuery, useLoginMutation, useRegisterMutation, useLogoutMutation, useResetUserPasswordMutation } = authApi

// Export reducer
export const authServiceReducer = authApi.reducer

// Export reducerPath
export const authServiceReducePath = authApi.reducerPath

// Export middleware
export const authServiceMiddleware = authApi.middleware