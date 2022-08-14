import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../authService/authService";

export const imagesApiService = createApi({
    reducerPath: "imagesApiService",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (build) => ({
        setImageToServer: build.mutation<string, { token: string, data: FormData }>({
            query: ({token, data}) => ({
                url: "/api/Image/SaveImage",
                method: "POST",
                body: {
                    file: data
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
    })
});
