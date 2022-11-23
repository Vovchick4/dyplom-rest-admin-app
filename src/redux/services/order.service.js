import { toast } from "react-toastify"
import { createApi } from "@reduxjs/toolkit/query/react"

import { fetchBaseUrl } from "./helpers"
import { getErrorMessage } from "../../utils/getErrorMessage"

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseUrl,
    tagTypes: ["OrderService"],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({
                url: "orders",
            }),
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
export const { useGetOrdersQuery } = orderApi

// Export reducer
export const orderServiceReducer = orderApi.reducer

// Export reducerPath
export const orderServiceReducePath = orderApi.reducerPath

// Export middleware
export const orderServiceMiddleware = orderApi.middleware