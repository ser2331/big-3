import React, { FC } from "react";
import { useAppSelector } from "../../../../core/redux/redux";
import { Item } from "./PlayerItem/PlayersItem";
import { IPlayersItems } from "../../interfaces/players-interfaces";
import { ITeams } from "../../../teams/interfaces/teams-interfaces";

import s from "./PlayersItems.module.scss";

export const PlayersItems: FC<IPlayersItems> = ({ setItemId, players }) => {
    const { teams } = useAppSelector(state => state.teamsReducer);

    return (
        <div className={s.PlayersItems}>
            {players?.map((item) => {
                const playerTeam = teams.find((t: ITeams) => t.id === item.team);
                const teamName = playerTeam?.name;

                return (
                    <div className={s.PlayersItems__itemWrapper} key={item.id}>
                        <Item
                            name={item.name}
                            teamName={teamName}
                            image={item.avatarUrl}
                            id={item.id}
                            number={item.number}
                            setItemId={setItemId}
                        />
                    </div>
                );
            })}
        </div>
    );
};
