import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination, ITeams } from "./interfaces/teams-interfaces";

export interface TeamsState {
    teams: ITeams[];
    currentTeam: ITeams;
    searchTeam: string;
    teamId: number | null;
    pagination: IPagination;
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
    pagination: {
        itemsPerPage: 6,
        pageCount: 1,
        currentPage: 1,
    },
    searchTeam: "",
    teamId: null,
};

export const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        setTeams(state, action: PayloadAction<ITeams[]>) {
            state.teams = action.payload;
        },
        setPagination(state, action: PayloadAction<IPagination>) {
            state.pagination = action.payload;
        },
        setSearchTeam(state, action: PayloadAction<string>) {
            state.searchTeam = action.payload;
        },
        setTeamId(state, action: PayloadAction<number | null>) {
            state.teamId = action.payload;
        },
        setCurrentTeam(state, action: PayloadAction<ITeams>) {
            state.currentTeam = action.payload;
        },
        resetTeamsInformation(state) {
            state.currentTeam = {
                name: "",
                foundationYear: 0,
                division: "",
                conference: "",
                imageUrl: "",
                id: 0,
            };
            state.teamId = null;
        },
        resetTeamsFilters(state) {
            state.pagination.itemsPerPage = 6;
            state.pagination.pageCount = 1;
            state.pagination.currentPage = 1;
            state.searchTeam = "";
        }
    }

});

export default teamsSlice.reducer;