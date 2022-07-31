import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITeams } from "./interfaces/ITeams";

interface TeamsState {
    teams: ITeams[];
    isLoading: boolean;
    error: string;
}

const initialState: TeamsState = {
    teams: [
        { name: "Ducova Irina Sergey#22", foundationYear: 0, id: 0, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Irina Sergey#22", foundationYear: 0, id: 234, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Irina#22", foundationYear: 0, id: 234123, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Irinay#22", foundationYear: 0, id: 210, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 14524, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 234150, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 1245235, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 12435, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 12345421, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 2340, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 40, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 320, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 234234, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 2340, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 223444, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 234444, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 23432444, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 46, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 657, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 567, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 6566, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 57770, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 75670, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
        { name: "Ducov Sergey#22", foundationYear: 0, id: 5675676, division: "srserserser", conference: "", imageUrl: "sdfvsdfsdf" },
    ],
    isLoading: false,
    error: ""
};

export const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        // getPlayers(state, action: PayloadAction<Array<string>>) {
        //     state.players.push(action.payload);
        // }
    }

});

export default teamsSlice.reducer;