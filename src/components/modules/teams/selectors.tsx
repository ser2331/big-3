import { createSelector } from "reselect";

const teams = (state: any) => state.teamsReducer.teams;
const searchTeam = (state: any) => state.teamsReducer.searchTeam;


export const getFilteredItems = createSelector(
    [teams, searchTeam],
    (groupsArray, searchedTeam) => {
        let result = [...groupsArray];

        if (searchedTeam.length > 0) {
            result = result.filter((item: any) => {
                return item.name.toLowerCase()
                    .indexOf(searchedTeam.toLowerCase()) > -1;
            });
        }

        return result;
    },
);
