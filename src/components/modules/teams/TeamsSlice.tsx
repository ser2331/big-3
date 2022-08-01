import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITeams } from "./interfaces/ITeams";

interface TeamsState {
    teams: ITeams[];
    isLoading: boolean;
    error: string;
    itemsPerPage: number;
    searchTeam: string;
    teamId: number | null;
}

const initialState: TeamsState = {
    teams: [
        { name: "Ducova Irina Sergey#22", foundationYear: 31413244, id: 1233333, division: "srserserser", conference: "dscqwdqw", imageUrl: "" },
        { name: "Ducov Irina Sergey#22", foundationYear: 2343210, id: 234, division: "srserserser", conference: "dsvadfgdfg", imageUrl: "" },
        { name: "Ducov Irina#22", foundationYear: 12312, id: 234123, division: "srserserser", conference: "afsgafgvf", imageUrl: "" },
        { name: "Ducov Irinay#22", foundationYear: 123123, id: 210, division: "srserserser", conference: "afgfdvdf", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 2234, id: 14524, division: "srserserser", conference: "afdgfdaf", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 14545, id: 234150, division: "srserserser", conference: "afdgdfd", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 142514, id: 1245235, division: "srserserser", conference: "afvbfb", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 142545, id: 12435, division: "srserserser", conference: "afdbdfb", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 145, id: 12345421, division: "srserserser", conference: "adfbafdb", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 145430, id: 2340, division: "srserserser", conference: "", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 145, id: 40, division: "srserserser", conference: "", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 14351340, id: 320, division: "srserserser", conference: "", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 234234, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 2340, division: "srserserser", conference: "", imageUrl: "" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 223444, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 234444, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 23432444, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 46, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 657, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 567, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 6566, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
    ],
    isLoading: false,
    error: "",
    itemsPerPage: 6,
    searchTeam: "",
    teamId: null,
};

export const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        setNumberItemsPerPage(state, action: PayloadAction<number>) {
            state.itemsPerPage = action.payload;
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