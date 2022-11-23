export const setToken = (headers, token) => (headers.set("Authorization", token))
export const unsetToken = (headers) => (headers.delete("Authorization"))