import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
    IGetToken,
    IGetTokenRegistration,
    IUserData
} from "../../modules/authorization/interfaces/authorization-interfaces";

export const baseUrl = "http://dev.trainee.dex-it.ru";

export const authService = createApi({
    reducerPath: "authService",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ["Teams"],
    endpoints: (build) => ({
        getSignUpToken: build.mutation<IUserData, IGetTokenRegistration>({
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
