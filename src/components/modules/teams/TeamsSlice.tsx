import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITeams } from "./interfaces/ITeams";

interface TeamsState {
    teams: ITeams[];
    isLoading: boolean;
    error: string;
    itemsPerPage: number;
    searchTeam: string;
    teamId: number | null;
    pageCount: number;
}

const initialState: TeamsState = {
    teams: [],
    isLoading: false,
    error: "",
    itemsPerPage: 6,
    searchTeam: "",
    teamId: null,
    pageCount: 2,
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
        setSearchTeam(state, action: PayloadAction<string>) {
            state.searchTeam = action.payload;
        },
        setTeamId(state, action: PayloadAction<number | null>) {
            state.teamId = action.payload;
        }
    }

});

export default teamsSlice.reducer;