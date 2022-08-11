import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
    IAddTeam,
    IDeleteTeam,
    IGetTeam,
    IGetTeams,
    IResTeams,
    ITeams,
} from "../../modules/teams/interfaces/teams-interfaces";
import { baseUrl } from "../apiService";

export const teamsApiService = createApi({
    reducerPath: "teamsApiService",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ["Teams"],
    endpoints: (build) => ({
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
            query: ({token, name, foundationYear, division, conference, imageUrl}) => ({
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
        editTeam: build.mutation<IAddTeam, IAddTeam>({
            query: ({token, name, foundationYear, division, conference, imageUrl, id}) => ({
                url: "/api/Team/Update",
                method: "PUT",
                body: {
                    name,
                    foundationYear,
                    division,
                    conference,
                    imageUrl,
                    id,
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
                params: {
                    id
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
    })
});
