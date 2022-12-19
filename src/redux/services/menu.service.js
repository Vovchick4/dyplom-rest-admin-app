import { createApi } from '@reduxjs/toolkit/query/react'

import { toast } from 'react-toastify'
import { getErrorMessage } from '../../utils/getErrorMessage'
import { fetchBaseUrl } from './helpers'

export const menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: fetchBaseUrl,
    tagTypes: ['Menu', "Locales"],
    endpoints: (builder) => ({
        getMenu: builder.query(({
            query: () => ({
                method: "GET",
                url: "/categories"
            }),
            transformResponse: (res) => res.data,
            providesTags: ["Menu", "Locales"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })),
        createMenu: builder.mutation(({
            query: (data) => ({
                method: "POST",
                url: "/categories",
                body: data
            }),
            invalidatesTags: ["Menu"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })),
        editMenu: builder.mutation(({
            query: ({ sectionId, data }) => ({
                method: "POST",
                url: `/categories/${sectionId}`,
                body: data
            }),
            invalidatesTags: ["Menu"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })),
        deleteMenu: builder.mutation(({
            query: (sectionId) => ({
                method: "DELETE",
                url: `/categories/${sectionId}`,
            }),
            invalidatesTags: ["Menu"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })),

    }),
})

// Exports Hooks
export const { useGetMenuQuery, useCreateMenuMutation, useEditMenuMutation, useDeleteMenuMutations } = menuApi

// Export reducer
export const menuServiceReducer = menuApi.reducer

// Export reducerPath
export const menuServiceReducePath = menuApi.reducerPath

// Export middleware
export const menuServiceMiddleware = menuApi.middleware