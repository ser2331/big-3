import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
    IAddTeam,
    IDeleteTeam,
    IGetTeam,
    IGetTeams,
    IResTeams,
    ITeams,
} from "../../modules/teams/interfaces/teams-interfaces";
import { baseUrl } from "../authService/authService";
import { RootState } from "../../core/redux/store";

export const teamsApiService = createApi({
    reducerPath: "teamsApiService",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authorizationReducer.token;
            if (token) {
                headers.set("Authorization", token ? `Bearer ${token}` : "");
            }
            return headers;
        }
    }),
    tagTypes: ["Teams"],
    endpoints: (build) => ({
        getTeams: build.query<IResTeams, IGetTeams>({
            query: ({page, pageSize, name}) => ({
                url: "/api/Team/GetTeams",
                params: {
                    name: name,
                    page: page,
                    pageSize: pageSize,
                }
            }),
            providesTags: () => ["Teams"],
        }),
        getTeam: build.query<ITeams, IGetTeam>({
            query: ({teamId}) => ({
                url: "/api/Team/Get",
                params: {
                    id: teamId,
                }
            })
        }),
        addTeam: build.mutation<IAddTeam, IAddTeam>({
            query: ({name, foundationYear, division, conference, imageUrl}) => ({
                url: "/api/Team/Add",
                method: "POST",
                body: {
                    name,
                    foundationYear,
                    division,
                    conference,
                    imageUrl,
                }
            }),
            invalidatesTags: ["Teams"]
        }),
        editTeam: build.mutation<IAddTeam, IAddTeam>({
            query: ({name, foundationYear, division, conference, imageUrl, id}) => ({
                url: "/api/Team/Update",
                method: "PUT",
                body: {
                    name,
                    foundationYear,
                    division,
                    conference,
                    imageUrl,
                    id,
                }
            }),
            invalidatesTags: ["Teams"]
        }),
        deleteTeam: build.mutation<IAddTeam, IDeleteTeam>({
            query: ({id}) => ({
                url: "/api/Team/Delete",
                method: "DELETE",
                params: {
                    id
                }
            })
        }),
    })
});
