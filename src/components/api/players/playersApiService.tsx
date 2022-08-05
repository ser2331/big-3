import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../apiService";
import {
    IAddPlayer, IAddPlayerFormValidation, IDeletePlayer,
    IGetPlayer,
    IGetPlayers,
    IPlayers,
    IResPlayers
} from "../../modules/players/interfaces/players-interfaces";

export const playersApiService = createApi({
    reducerPath: "playersApiService",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ["Players"],
    endpoints: (build) => ({
        getPlayers: build.query<IResPlayers, IGetPlayers>({
            query: ({token, page, pageSize, name, teamIds}) => ({
                url: "/api/Player/GetPlayers",
                params: {
                    name: name,
                    teamIds,
                    page: page,
                    pageSize: pageSize,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: result => ["Players"],
        }),
        getPlayer: build.query<IPlayers, IGetPlayer>({
            query: ({token, playerId}) => ({
                url: "/api/Player/Get",
                params: {
                    id: playerId,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        addPlayer: build.mutation<IAddPlayer, IAddPlayerFormValidation>({
            query: ({ token, name, number, position, team, birthday, height, weight, avatarUrl }) => ({
                url: "/api/Player/Add",
                method: "POST",
                body: {
                    name,
                    number,
                    position: position.value,
                    team: team.value,
                    birthday,
                    height,
                    weight,
                    avatarUrl
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Players"]
        }),
        editPlayer: build.mutation<IAddPlayer, IAddPlayerFormValidation>({
            query: ({token, name, number, position, team, birthday, height, weight, avatarUrl, id}) => ({
                url: "/api/Player/Update",
                method: "PUT",
                body: {
                    name,
                    number,
                    position: position.value,
                    team: team.value,
                    birthday,
                    height,
                    weight,
                    avatarUrl,
                    id,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Players"]
        }),
        deletePlayer: build.mutation<IAddPlayer, IDeletePlayer>({
            query: ({token, id}) => ({
                url: "/api/Player/Delete",
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
