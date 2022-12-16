import { toast } from "react-toastify"
import { createApi } from "@reduxjs/toolkit/query/react"

import { fetchBaseUrl } from "./helpers"
import { getErrorMessage } from "../../utils/getErrorMessage"

export const tableApi = createApi({
    reducerPath: "tableApi",
    baseQuery: fetchBaseUrl,
    tagTypes: ["Table", "RestaurantId"],
    endpoints: (builder) => ({
        getTables: builder.query({
            query: () => ({
                url: "tables",
            }),
            providesTags: ["Table", "RestaurantId"],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch ({ error }) {
                    toast.error(getErrorMessage(error.data))
                }
            },
            transformResponse: (res) => {
                const resData = res.data
                const formatedData = resData?.length > 0 ? resData.reduce((prev, current_element) => {
                    if (!prev[current_element.category]) {
                        prev[current_element.category] = []
                    }
                    prev[current_element.category].push(current_element)
                    return prev
                }, {}) : { waiter: [], bill_request: [], }
                return formatedData
            }
        })
    })
})

// Exports Hooks
export const { useGetTablesQuery } = tableApi

// Export reducer
export const tableServiceReducer = tableApi.reducer

// Export reducerPath
export const tableServiceReducePath = tableApi.reducerPath

// Export middleware
export const tableServiceMiddleware = tableApi.middleware