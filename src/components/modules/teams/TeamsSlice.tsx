import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITeams } from "./interfaces/teams-interfaces";

export interface TeamsState {
    teams: ITeams[];
    currentTeam: ITeams;
    itemsPerPage: number;
    searchTeam: string;
    teamId: number | null;
    pageCount: number;
    currentPage: number;
}

const initialState: TeamsState = {
    teams: [],
    currentTeam: {
        name: "",
        foundationYear: 0,
        division: "",
        conference: "",
        imageUrl: "",
        id: 0,
    },
    itemsPerPage: 6,
    searchTeam: "",
    teamId: null,
    pageCount: 1,
    currentPage: 1,
};

export const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        setTeams(state, action: PayloadAction<ITeams[]>) {
            state.teams = action.payload;
        },
        setNumberItemsPerPage(state, action: PayloadAction<number>) {
            state.itemsPerPage = action.payload;
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchTeam(state, action: PayloadAction<string>) {
            state.searchTeam = action.payload;
        },
        setTeamId(state, action: PayloadAction<number | null>) {
            state.teamId = action.payload;
        },
        setCurrentTeam(state, action: PayloadAction<ITeams>) {
            state.currentTeam = action.payload;
        }
    }

});

export default teamsSlice.reducer;