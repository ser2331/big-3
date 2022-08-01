import { createSelector } from "reselect";

const players = (state: any) => state.playersReducer.players;
const selectedPlayers = (state: any) => state.playersReducer.selectedPlayers;
const searchPlayerName = (state: any) => state.playersReducer.searchPlayerName;


export const getFilteredItems = createSelector(
    [players, selectedPlayers, searchPlayerName],
    (groupsArray, selected, searchedPlayer) => {
        let result = [...groupsArray];

        if (selected?.length) {
            result = groupsArray?.filter((item: any) => {
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
