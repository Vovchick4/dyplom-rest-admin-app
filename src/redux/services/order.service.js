import { toast } from "react-toastify"
import { createApi } from "@reduxjs/toolkit/query/react"

import { fetchBaseUrl } from "./helpers"
import { getErrorMessage } from "../../utils/getErrorMessage"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseUrl,
    tagTypes: ["Order", "RestaurantId"],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({
                url: "orders",
            }),
            providesTags: ["Order", "RestaurantId"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        getInvoicesOrder: builder.query({
            query: (data) => ({
                url: "orders-invoices",
                params: data,
            }),
            providesTags: ["Order", "RestaurantId"],
            transformResponse: (res) => res.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        editOrder: builder.mutation({
            query: ({ orderId, data }) => ({
                url: `orders/${orderId}`,
                method: "POST",
                body: {
                    _method: 'PATCH',
                    ...data
                }
            }),
            invalidatesTags: ["Order"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            }
        }),
        removeOrder: builder.mutation({
            query: (orderId) => ({
                method: "DELETE",
                url: `orders/${orderId}`
            }),
            invalidatesTags: ["Order"],
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
export const { useGetOrdersQuery, useGetInvoicesOrderQuery, useEditOrderMutation, useRemoveOrderMutation } = orderApi

// Export reducer
export const orderServiceReducer = orderApi.reducer

// Export reducerPath
export const orderServiceReducePath = orderApi.reducerPath

// Export middleware
export const orderServiceMiddleware = orderApi.middleware