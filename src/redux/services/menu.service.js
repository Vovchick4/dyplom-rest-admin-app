import { createApi } from '@reduxjs/toolkit/query/react'

import { toast } from 'react-toastify'
import { getErrorMessage } from '../../utils/getErrorMessage'
import { fetchBaseUrl } from './helpers'

export const menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: fetchBaseUrl,
    tagTypes: ['Menu', "PlateSync", "Locales", "RestaurantId"],
    endpoints: (builder) => ({
        getMenu: builder.query(({
            query: (page) => ({
                method: "GET",
                url: "/categories",
                params: {
                    page
                }
            }),
            providesTags: ['Menu', 'Locales', 'RestaurantId'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })),
        getMenuById: builder.query(({
            query: (sectionId) => ({
                method: "GET",
                url: `/categories/${sectionId}`
            }),
            transformResponse: (res) => res.data,
            providesTags: ["Menu"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })),
        getPlateListSync: builder.query(({
            query: (sectionId) => ({
                method: "GET",
                url: `/categories/${sectionId}/plates-list`,
            }),
            transformResponse: (res) => res.data,
            providesTags: ["Menu", "PlateSync"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })),
        plateSync: builder.mutation(({
            query: ({ sectionId, plates }) => ({
                method: "POST",
                url: `/categories/${sectionId}/plates-sync`,
                body: { plate_ids: plates }
            }),
            invalidatesTags: ["Menu", "PlateSync"],
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
export const { useGetMenuQuery, useGetMenuByIdQuery, useGetPlateListSyncQuery,
    usePlateSyncMutation, useCreateMenuMutation, useEditMenuMutation, useDeleteMenuMutation } = menuApi

// Export reducer
export const menuServiceReducer = menuApi.reducer

// Export reducerPath
export const menuServiceReducePath = menuApi.reducerPath

// Export middleware
export const menuServiceMiddleware = menuApi.middleware