import React, { FC } from "react";
import { Col, Row } from "antd";
import { useAppSelector } from "../../../../core/redux/redux";
import fakeImage from "../../../../assests/images/avatar.jpg";
import { IPlayerItemProps, IPlayersItems } from "../../interfaces/players-interfaces";
import { ITeams } from "../../../teams/interfaces/teams-interfaces";

import "./players-items.scss";

const PlayersItems: FC<IPlayersItems> = ({ setItemId }) => {
    const { teams, isMobile } = useAppSelector(state => state.teamsReducer);
    const { players } = useAppSelector(state => state.playersReducer);

    const span = isMobile ? 12 : 8;
    const gutter = isMobile ? 16 : 24;

    const Item:FC<IPlayerItemProps> = ({name, image, id, teamName, number}) => {

        return (
            <div className="PlayerItem" onClick={() => setItemId(id)}>
                <div className="image-wrapper">
                    <img alt="teamImage" src={image || fakeImage}/>
                </div>
                <div className="description-wrapper">
                    <div className="name-wrapper">
                        <div className="player-name">{name}</div>
                        <div className="player-number">{`#${number}`}</div>
                    </div>

                    <span className="team-name">{teamName}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="PlayersItems">
            <Row gutter={[gutter, gutter]}>
                {players?.map((item) => {
                    const playerTeam = teams.find((t: ITeams) => t.id === item.team);
                    const teamName = playerTeam?.name;

                    return (
                        <Col span={span} className="PlayersItems__item-wrapper" key={item.id}>
                            <Item
                                name={item.name}
                                teamName={teamName}
                                image={item.avatarUrl}
                                id={item.id}
                                number={item.number}
                            />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default PlayersItems;