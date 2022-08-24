import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../authService/authService";
import {builderParamsIds} from "../../common/helpers/builderParamsIds";
import {
    IAddPlayer, IAddPlayerFormValidation,
    IGetPlayer,
    IGetPlayers,
    IPlayers,
    IResPlayers
} from "../../modules/players/interfaces/players-interfaces";
import { RootState } from "../../core/redux/store";

export const playersApiService = createApi({
    reducerPath: "playersApiService",
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
    tagTypes: ["Players"],
    endpoints: (build) => ({
        getPlayers: build.query<IResPlayers, IGetPlayers>({
            query: ({page, pageSize, name, teamIds}) => ({
                url: `/api/Player/GetPlayers?${builderParamsIds(teamIds)}`,
                params: {
                    name,
                    page,
                    pageSize,
                }
            }),
            providesTags: () => ["Players"],
        }),
        getPlayer: build.query<IPlayers, IGetPlayer>({
            query: ({playerId}) => ({
                url: "/api/Player/Get",
                params: {
                    id: playerId,
                }
            })
        }),
        getPositions: build.query({
            query: ({token}) => ({
                url: "/api/Player/GetPositions",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        addPlayer: build.mutation<IPlayers, IAddPlayerFormValidation>({
            query: ({ name, number, position, team, birthday, height, weight, avatarUrl }) => ({
                url: "/api/Player/Add",
                method: "POST",
                body: {
                    name,
                    number,
                    position: position.value,
                    team: team?.value,
                    birthday,
                    height,
                    weight,
                    avatarUrl
                }
            }),
            invalidatesTags: ["Players"]
        }),
        editPlayer: build.mutation<IAddPlayer, IAddPlayerFormValidation>({
            query: ({name, number, position, team, birthday, height, weight, avatarUrl, id}) => ({
                url: "/api/Player/Update",
                method: "PUT",
                body: {
                    name,
                    number,
                    position: position.value,
                    team: team?.value,
                    birthday,
                    height,
                    weight,
                    avatarUrl,
                    id,
                }
            }),
            invalidatesTags: ["Players"]
        }),
        deletePlayer: build.mutation<IAddPlayer, number>({
            query: (id) => ({
                url: "/api/Player/Delete",
                method: "DELETE",
                params: {id}
            })
        }),
    })
});
