import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGetToken, IUserData } from "../modules/authorization/interfaces/authorization-interfaces";
import {IAddTeam, IDeleteTeam, IGetTeam, IGetTeams, IResTeams, ITeams} from "../modules/teams/interfaces/ITeams";


export const apiService = createApi({
    reducerPath: "apiService",
    baseQuery: fetchBaseQuery({baseUrl: "http://dev.trainee.dex-it.ru"}),
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
        getTeams: build.query<IResTeams, IGetTeams>({
            query: ({token, page, pageSize, name}) => ({
                url: "/api/Team/GetTeams",
                params: {
                    name: name,
                    page: page,
                    pageSize: pageSize,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: result => ["Teams"],
        }),
        getTeam: build.query<ITeams, IGetTeam>({
            query: ({token, teamId}) => ({
                url: "/api/Team/Get",
                params: {
                    id: teamId,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        addTeam: build.mutation<IAddTeam, IAddTeam>({
            query: ({token, name, foundationYear, division, conference,imageUrl}) => ({
                url: "/api/Team/Add",
                method: "POST",
                body: {
                    name,
                    foundationYear,
                    division,
                    conference,
                    imageUrl,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Teams"]
        }),
        deleteTeam: build.mutation<IAddTeam, IDeleteTeam>({
            query: ({token, id}) => ({
                url: "/api/Team/Delete",
                method: "DELETE",
                body: {
                    id
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
    })
});
