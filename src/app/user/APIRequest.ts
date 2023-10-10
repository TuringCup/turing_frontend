export type ResponseData = {
    success: boolean,
    response: object | string
}

export type APIRequest = {
    path?: string,
    method?: "POST" | "GET" | "PUT" | "DELETE",
    data?: string | object,
}