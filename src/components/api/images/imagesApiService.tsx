import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../authService/authService";
import { RootState } from "../../core/redux/store";

export const imagesApiService = createApi({
    reducerPath: "imagesApiService",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authorizationReducer.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Images"],
    endpoints: (build) => ({
        addImage: build.mutation<string, FormData>({
            query: (data) => ({
                url: "/api/Image/SaveImage",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Images"]
        }),
    })
});
