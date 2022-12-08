
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query"
import { tokenManagment } from "./"
import { ApiUrl } from "../../../config/axios"
const { setToken, unsetToken } = tokenManagment

const fetchBaseUrl = fetchBaseQuery({
    baseUrl: ApiUrl, prepareHeaders: (headers, { getState }) => {
        // Set aceesstoken default 
        const { token: userToken } = getState().auth
        const data = getState().hotel
        const locale = getState().locale.locale
        if (userToken?.accessToken) {
            setToken(headers, `Bearer ${userToken.accessToken}`)
        } else {
            unsetToken()
        }
        // Set HotelId to default
        if (data?.id) {
            headers.set("restaurant", data?.id)
        }
        // Set locale to default
        if (locale) {
            headers.set("locale", locale)
        }
        return headers
    }
})

export default fetchBaseUrl