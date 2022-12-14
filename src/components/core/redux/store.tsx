import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playersReducer from "../../modules/players/PlayersSlice";
import teamsReducer from "../../modules/teams/TeamsSlice";
import authorizationReducer from "../../modules/authorization/AuthorizationSlice";
import appReducer from "../../modules/App/AppSlice";
import { authService } from "../../api/authService/authService";
import { teamsApiService } from "../../api/teams/teamsApiService";
import { playersApiService } from "../../api/players/playersApiService";
import { imagesApiService } from "../../api/images/imagesApiService";

const rootReducer = combineReducers({
    playersReducer,
    teamsReducer,
    authorizationReducer,
    appReducer,
    [authService.reducerPath]: authService.reducer,
    [teamsApiService.reducerPath]: teamsApiService.reducer,
    [playersApiService.reducerPath]: playersApiService.reducer,
    [imagesApiService.reducerPath]: imagesApiService.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(
                authService.middleware,
                teamsApiService.middleware,
                playersApiService.middleware,
                imagesApiService.middleware
            ),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

