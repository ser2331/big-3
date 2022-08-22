import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StorageService from "../../common/helpers/storageService/storage-service";
import Types from "../../types";
import { IUserData } from "./interfaces/authorization-interfaces";

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
}

const initialState: AuthorizationState = {
    login: "",
    password: "",
    name: userName || "",
    avatarUrl: avatar || "",
    token: token || "",
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
        setSignOut(state) {
            state.name = "";
            state.avatarUrl = "";
            state.token = "";
        },
    }
});

export default authorizationSlice.reducer;