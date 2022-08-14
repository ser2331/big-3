import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import StorageService from "../../common/helpers/storageService/storage-service";
import Types from "../../types";
import { IUserData } from "./interfaces/authorization-interfaces";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const { localStorage } = Types;

const token = StorageService.get(localStorage.token);
const userName = StorageService.get(localStorage.name);
const avatar = StorageService.get(localStorage.avatarUrl);

interface AuthorizationState {
    login: string;
    password: string;
    name: string;
    avatarUrl: string;
    token: string;
    error: boolean;
    tokenError: FetchBaseQueryError | SerializedError;
}

const initialState: AuthorizationState = {
    login: "",
    password: "",
    name: userName || "",
    avatarUrl: avatar || "",
    token: token || "",
    error: false,
    tokenError:   {
        status: 0,
        data: undefined,
    },
};

export const authorizationSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<IUserData>) {
            state.name = action.payload.name;
            state.avatarUrl = action.payload.avatarUrl;
            state.token = action.payload.token;
        },
        setErrorIndicator(state, action: PayloadAction<boolean>) {
            state.error = action.payload;
        },
        setTokenError(state, action: PayloadAction<FetchBaseQueryError | SerializedError>) {
            state.tokenError = action.payload;
        },
    }
});

export default authorizationSlice.reducer;