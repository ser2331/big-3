import React, { FC } from "react";
import { Col, Row } from "antd";
import { useAppSelector } from "../../../../core/redux/redux";
import fakeImage from "../../../../assests/images/fakeImage.png";
import { IPlayerItemProps, IPlayersItems } from "../../interfaces/players-interfaces";
import { ITeams } from "../../../teams/interfaces/teams-interfaces";

import "./players-items.scss";

const PlayersItems: FC<IPlayersItems> = ({ setItemId }) => {
    const { teams } = useAppSelector(state => state.teamsReducer);
    const { players } = useAppSelector(state => state.playersReducer);

    const Item:FC<IPlayerItemProps> = ({name, image, id, team}) => {
        const teamName = teams.find((item: ITeams) => item.id === team);

        return (
            <div className="PlayerItem" onClick={() => setItemId(id)}>
                <div className="image-wrapper">
                    <img alt="teamImage" src={image || fakeImage}/>
                </div>
                <div className="description-wrapper">
                    <span className="team-name">{name}</span>
                    <span className="team-year">{teamName?.name}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="PlayersItems">
            <Row gutter={[24, 24]}>
                {players?.map((item) => (
                    <Col span={6} className="PlayersItems__item-wrapper" key={item.id}>
                        <Item name={item.name} team={item.team} image={item.avatarUrl} id={item.id} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default PlayersItems;