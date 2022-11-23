
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query"
import { tokenManagment } from "./"
import { ApiUrl } from "../../../config/axios"
const { setToken, unsetToken } = tokenManagment

const fetchBaseUrl = fetchBaseQuery({
    baseUrl: ApiUrl, prepareHeaders: (headers, { getState }) => {
        const { token: userToken } = getState().auth
        if (userToken?.accessToken) {
            setToken(headers, `Bearer ${userToken.accessToken}`)
        } else {
            unsetToken()
        }
        return headers
    }
})

export default fetchBaseUrl