import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGetToken, IUserData } from "../modules/authorization/interfaces/authorization-interfaces";

export const baseUrl = "http://dev.trainee.dex-it.ru";

export const apiService = createApi({
    reducerPath: "apiService",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ["Teams"],
    endpoints: (build) => ({
        getSignUpToken: build.mutation<IUserData, IGetToken>({
            query: (data) => ({
                url: "/api/Auth/SignUp",
                method: "POST",
                body: {
                    userName: data.name,
                    login: data.login,
                    password: data.password,
                }
            })
        }),
        getSignInToken: build.mutation<IUserData, IGetToken>({
            query: (data) => ({
                url: "/api/Auth/SignIn",
                method: "POST",
                body: {
                    login: data.login,
                    password: data.password,
                }
            })
        }),
    })
});
