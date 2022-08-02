import { createSelector } from "reselect";
import { IPlayers } from "./interfaces/players-interfaces";

const players = (state: any) => state.playersReducer.players;
const selectedPlayers = (state: any) => state.playersReducer.selectedPlayers;
const searchPlayerName = (state: any) => state.playersReducer.searchPlayerName;
const playerId = (state: any) => state.playersReducer.playerId;


export const getFilteredItems = createSelector(
    [players, selectedPlayers, searchPlayerName],
    (groupsArray, selected, searchedPlayer) => {
        let result = [...groupsArray];

        if (selected?.length) {
            result = groupsArray?.filter((item: IPlayers) => {
                return selected?.find(({value}: any) => value === item.id);
            });
        }
        
        if (searchedPlayer.length > 0) {
            result = result.filter((item: any) => {
                return item.name.toLowerCase()
                    .indexOf(searchedPlayer.toLowerCase()) > -1;
            });
        }

        return result;
    },
);

export const getSelectedPlayer= createSelector(
    [players, playerId],
    (groupsArray, player) => {
        let result = {};

        if (player) {
            result = groupsArray.find((item: any) => {
                return item.id === player;
            });
        }

        return result;
    },
);
