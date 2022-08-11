import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IPlayers } from "./interfaces/players-interfaces";
import { IPagination, ITeamsSelectOptions } from "../teams/interfaces/teams-interfaces";

interface PlayersState {
    players: IPlayers[];
    currentPlayer: IPlayers;
    playerId: number | null;
    selectedTeams: ITeamsSelectOptions[];
    searchPlayerName: string;
    pagination: IPagination;

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
    pagination: {
        itemsPerPage: 6,
        pageCount: 1,
        currentPage: 0,
    },
    searchPlayerName: "",
    playerId: null,
};

export const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setPlayers(state, action: PayloadAction<IPlayers[]>) {
            state.players = action.payload;
        },
        setPagination(state, action: PayloadAction<IPagination>) {
            state.pagination = action.payload;
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
    }

});

export default playersSlice.reducer;