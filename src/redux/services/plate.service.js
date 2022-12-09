import { toast } from "react-toastify"
import { createApi } from "@reduxjs/toolkit/query/react"

import { fetchBaseUrl } from "./helpers"
import { getErrorMessage } from "../../utils/getErrorMessage"


export const plateApi = createApi({
    reducerPath: "platetApi",
    baseQuery: fetchBaseUrl,
    tagTypes: ["Plate"],
    endpoints: (builder) => ({
        getPlates: builder.query({
            query: ({ searchText, page }) => ({
                url: "plates",
                headers: {
                    searchText
                },
                params: {
                    page
                }
            }),
            providesTags: ["Plate"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        getPlateById: builder.query({
            query: (plateId) => ({
                url: `plates/${plateId}`,
            }),
            providesTags: ["Plate"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            },
            transformResponse: (res) => res.data
        }),
        createPlate: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: "plates",
                body: data
            }),
            invalidatesTags: ["Plate"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        editPlate: builder.mutation({
            query: ({ plateId, data }) => ({
                method: "POST",
                url: `plates/${plateId}`,
                body: data
            }),
            invalidatesTags: ["Plate"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        removePlate: builder.mutation({
            query: (plateId) => ({
                method: "DELETE",
                url: `plates/${plateId}`,
            }),
            invalidatesTags: ["Plate"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        })
    })
})

// Exports Hooks
export const { useGetPlatesQuery, useGetPlateByIdQuery, useCreatePlateMutation,
    useEditPlateMutation, useRemovePlateMutation } = plateApi

// Export reducer
export const plateServiceReducer = plateApi.reducer

// Export reducerPath
export const plateServiceReducePath = plateApi.reducerPath

// Export middleware
export const plateServiceMiddleware = plateApi.middleware