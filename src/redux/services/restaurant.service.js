import { toast } from "react-toastify"
import { createApi } from "@reduxjs/toolkit/query/react"

import { fetchBaseUrl } from "./helpers"
import { getErrorMessage } from "../../utils/getErrorMessage"

export const restaruantApi = createApi({
    reducerPath: "restaruantApi",
    baseQuery: fetchBaseUrl,
    tagTypes: ["Restaurant", "Locales"],
    endpoints: (builder) => ({
        getRestaurants: builder.query({
            query: ({ page }) => ({
                url: "restaurants",
                params: {
                    page
                }
            }),
            providesTags: ["Restaurant", "Locales"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        getRestaurantsSearchtext: builder.query({
            query: ({ searchText }) => ({
                url: `restaurants/search/${searchText}`
            }),
            providesTags: ["Restaurant"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        getRestaurantById: builder.mutation({
            query: (restId) => ({
                url: `restaurants/${restId}`,
            }),
            invalidatesTags: ["Restaurant"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        createRestaurant: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "restaurants",
                body: data
            }),
            invalidatesTags: ["Restaurant"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        editRestaurant: builder.mutation({
            query: ({ restId, data }) => ({
                method: "POST",
                url: `restaurants/${restId}`,
                body: { _method: "PATCH", ...data }
            }),
            invalidatesTags: ["Restaurant"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        removeRestaurant: builder.mutation({
            query: (restId) => ({
                method: "DELETE",
                url: `restaurants/${restId}`,
            }),
            invalidatesTags: ["Restaurant"],
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
export const { useGetRestaurantsQuery, useGetRestaurantsSearchtextQuery,
    useGetRestaurantByIdMutation, useCreateRestaurantMutation,
    useEditRestaurantMutation, useRemoveRestaurantMutation } = restaruantApi

// Export reducer
export const restaurantServiceReducer = restaruantApi.reducer

// Export reducerPath
export const restaurantServiceReducePath = restaruantApi.reducerPath

// Export middleware
export const restaurantServiceMiddleware = restaruantApi.middleware