import React, { FC } from "react";
import { useAppSelector } from "../../../../core/redux/redux";
import fakeImage from "../../../../assests/images/avatar.jpg";
import { IPlayerItemProps, IPlayersItems } from "../../interfaces/players-interfaces";
import { ITeams } from "../../../teams/interfaces/teams-interfaces";

import s from "./PlayersItems.module.scss";

export const PlayersItems: FC<IPlayersItems> = ({ setItemId, players }) => {
    const { teams } = useAppSelector(state => state.teamsReducer);

    const Item:FC<IPlayerItemProps> = ({name, image, id, teamName, number}) => {

        return (
            <div className={s.PlayerItem} onClick={() => setItemId(id)}>
                <div className={s.imageWrapper}>
                    <img alt="teamImage" src={image || fakeImage}/>
                </div>
                <div className={s.descriptionWrapper}>
                    <div className={s.nameWrapper}>
                        <div className={s.playerName}>{name}</div>
                        <div className={s.playerNumber}>{`#${number}`}</div>
                    </div>

                    <span className={s.teamName}>{teamName}</span>
                </div>
            </div>
        );
    };

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
                        />
                    </div>
                );
            })}
        </div>
    );
};
