import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playersReducer from "../../modules/players/PlayersSlice";
import teamsReducer from "../../modules/teams/TeamsSlice";
import authorizationReducer from "../../modules/authorization/AuthorizationSlice";
import { apiService } from "../../api/apiService";
import { teamsApiService } from "../../api/teams/teamsApiService";
import { playersApiService } from "../../api/players/playersApiService";

const rootReducer = combineReducers({
    playersReducer,
    teamsReducer,
    authorizationReducer,
    [apiService.reducerPath]: apiService.reducer,
    [teamsApiService.reducerPath]: teamsApiService.reducer,
    [playersApiService.reducerPath]: playersApiService.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(apiService.middleware, teamsApiService.middleware, playersApiService.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

