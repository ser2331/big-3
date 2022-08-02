import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IPlayers } from "./interfaces/players-interfaces";

interface PlayersState {
    players: IPlayers[];
    isLoading: boolean;
    error: string;
    selectedPlayers: IPlayers[];
    itemsPerPage: number;
    searchPlayerName: string;
    playerId: null | number,
}

const initialState: PlayersState = {
    players: [
        { name: "Ducov Serge", birthday: "1970", id: 2340, height: 234, weight: 234, avatarUrl: "", number: 234234, position: "23egrwgetg", team: 234234  },
        { name: "Whittingto", birthday: "1970", id: 123, height: 234, weight: 234, avatarUrl: "", number: 23423, position: "wegrwgergwrwr", team: 2340  },
        { name: "Greg", birthday: "1970", id: 1233, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg Whitti", birthday: "1970", id: 1322, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Gre", birthday: "1970", id: 4353, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg ", birthday: "1970", id: 252, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "ttington ", birthday: "1970", id: 324, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "ittington", birthday: "1970", id: 32421, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg 22", birthday: "1970", id: 2135145, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Gre#22", birthday: "1970", id: 325215, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg Whittington", birthday: "1970", id: 1235151, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg Whittington", birthday: "1970", id: 15155, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg Whittington ", birthday: "1970", id: 1512351, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg Whittington", birthday: "1970", id: 12353, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
        { name: "Greg Whittington", birthday: "1970", id: 132535, height: 0, weight: 0, avatarUrl: "", number: 0, position: "", team: 0  },
    ],
    isLoading: false,
    error: "",
    selectedPlayers: [],
    itemsPerPage: 6,
    searchPlayerName: "",
    playerId: null,
};

export const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setSelectedPlayers(state, action: PayloadAction<IPlayers[]>) {
            state.selectedPlayers = action.payload;
        },
        setSearchPlayerName(state, action: PayloadAction<string>) {
            state.searchPlayerName = action.payload;
        },
        setPlayerId(state, action: PayloadAction<number>) {
            state.playerId = action.payload;
        }
    }

});

export default playersSlice.reducer;