import { createSelector } from "reselect";
import { ITeams } from "./interfaces/ITeams";

const teams = (state: any) => state.teamsReducer.teams;
const searchTeam = (state: any) => state.teamsReducer.searchTeam;
const teamId = (state: any) => state.teamsReducer.teamId;

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

export const getSelectedTeam = createSelector(
    [teams, teamId],
    (groupsArray, team) => {
        let result = {};

        if (team) {
            result = groupsArray.find((item: ITeams) => {
                return item.id === team;
            });
        }

        return result;
    },
);
