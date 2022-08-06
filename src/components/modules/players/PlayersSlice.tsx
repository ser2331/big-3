import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IPlayers } from "./interfaces/players-interfaces";
import { ITeamsSelectOptions } from "../teams/interfaces/teams-interfaces";

interface PlayersState {
    players: IPlayers[];
    currentPlayer: IPlayers;
    itemsPerPage: number;
    playerId: number | null;
    selectedTeams: ITeamsSelectOptions[];
    searchPlayerName: string;
    pageCount: number;
    currentPage: number;
}

const initialState: PlayersState = {
    players: [],
    currentPlayer: {
        id: null,
        name: "",
        birthday: "",
        avatarUrl: "",
        height: null,
        weight: null,
        number: null,
        position: "",
        team: null,
    },
    selectedTeams: [],
    itemsPerPage: 6,
    searchPlayerName: "",
    playerId: null,
    pageCount: 1,
    currentPage: 1,
};

export const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setPlayers(state, action: PayloadAction<IPlayers[]>) {
            state.players = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;  
        },
        setCurrentPlayer(state, action: PayloadAction<IPlayers>) {
            state.currentPlayer = action.payload;
        },
        setSearchPlayerName(state, action: PayloadAction<string>) {
            state.searchPlayerName = action.payload;
        },
        setPlayerId(state, action: PayloadAction<number | null>) {
            state.playerId = action.payload;
        },
        setSelectedTeam(state, action: PayloadAction<ITeamsSelectOptions[]>) {
            state.selectedTeams = action.payload;
        },
        setNumberItemsPerPage(state, action: PayloadAction<number>) {
            state.itemsPerPage = action.payload;
        },
    }

});

export default playersSlice.reducer;