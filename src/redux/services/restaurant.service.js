import { toast } from "react-toastify"
import { createApi } from "@reduxjs/toolkit/query/react"

import { fetchBaseUrl } from "./helpers"
import { getErrorMessage } from "../../utils/getErrorMessage"
import { setRest, deleteRest } from "../features/rest-slice"
import { updateHotel } from "../hotel/hotel.operations"

export const restaruantApi = createApi({
    reducerPath: "restaruantApi",
    baseQuery: fetchBaseUrl,
    tagTypes: ["Restaurant", "UpdateRestId", "Locales", "RestaurantId"],
    endpoints: (builder) => ({
        getRestaurants: builder.query({
            query: ({ page, searchText }) => {
                const url = !searchText ? `restaurants` : `restaurants/search/${searchText}`
                const params = !searchText ? { page } : {}
                return {
                    url,
                    params
                }
            },
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
        getRestaurantById: builder.query({
            query: (restId) => ({
                url: `restaurants/${restId}`,
            }),
            providesTags: ["UpdateRestId"],
            transformResponse: (res) => res.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setRest(data));
                } catch ({ error }) {
                    dispatch(deleteRest());
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        getRestaurantByIdEdit: builder.query({
            query: (restId) => ({
                url: `restaurants/${restId}`,
            }),
            transformResponse: (res) => res.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        getRestaurantStats: builder.query({
            query: () => ({
                url: "statistics/restaurant",
            }),
            providesTags: ["RestaurantId"],
            transformResponse: (res) => res.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        getRestaurantReviews: builder.query({
            query: () => ({
                url: "statistics/restaurant/reviews",
            }),
            providesTags: ["RestaurantId"],
            transformResponse: (res) => res.data,
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
                body: { _method: "PATCH", ...data },
            }),
            invalidatesTags: ["Restaurant", "UpdateRestId"],
            async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
                try {
                    await queryFulfilled
                    // dispatch(setRest(args))
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        editRestaurantFormData: builder.mutation({
            query: ({ restId, data }) => ({
                method: "POST",
                url: `restaurants/${restId}`,
                body: data,
            }),
            invalidatesTags: ["Restaurant", "UpdateRestId"],
            async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
                try {
                    await queryFulfilled
                    // dispatch(setRest(args))
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
export const { useGetRestaurantsQuery, useGetRestaurantsSearchtextQuery, useGetRestaurantByIdQuery, useGetRestaurantStatsQuery, useEditRestaurantFormDataMutation,
    useGetRestaurantByIdEditQuery, useCreateRestaurantMutation, useEditRestaurantMutation, useRemoveRestaurantMutation, useGetRestaurantReviewsQuery } = restaruantApi

// Export reducer
export const restaurantServiceReducer = restaruantApi.reducer

// Export reducerPath
export const restaurantServiceReducePath = restaruantApi.reducerPath

// Export middleware
export const restaurantServiceMiddleware = restaruantApi.middleware