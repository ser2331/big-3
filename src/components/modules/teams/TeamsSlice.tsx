import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IPagination, ITeams } from "./interfaces/teams-interfaces";
import Types from "../../types";

const  { appSizesMap } = Types;

export interface TeamsState {
    teams: ITeams[];
    currentTeam: ITeams;
    searchTeam: string;
    teamId: number | null;
    pagination: IPagination;
    showMobileMenu: boolean;
    isMobile: boolean;
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
        currentPage: 0,
    },
    searchTeam: "",
    teamId: null,
    showMobileMenu: false,
    isMobile: appSizesMap.get("desktop").key,
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
        setShowMobileMenu(state, action: PayloadAction<boolean>) {
            state.showMobileMenu = action.payload;
        },
        setIsMobile(state, action: PayloadAction<boolean>) {
            state.isMobile = action.payload;
        }
    }

});

export default teamsSlice.reducer;