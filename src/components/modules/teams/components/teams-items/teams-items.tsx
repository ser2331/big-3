import React, { FC } from "react";
import { useAppSelector } from "../../../../core/redux/redux";
import { Col, Row } from "antd";
import { ITeamItemProps, ITeams, ITeamsItems } from "../../interfaces/teams-interfaces";
import fakeImage from "../../../../assests/images/teamLogo.jpeg";

import "./teams-items.scss";

const TeamsItems:FC<ITeamsItems> = ({ setItemId } ) => {

    const { teams, isMobile } = useAppSelector(state => state.teamsReducer);

    const span = isMobile ? 12 : 8;
    const gutter = isMobile ? 16 : 24;

    const Item:FC<ITeamItemProps> = ({name, foundationYear, image, id}) =>  (
        <div className="TeamItem" onClick={() => setItemId(id)}>
            <div className="image-wrapper">
                <img alt="teamImage" src={image || fakeImage}/>
            </div>
            <div className="description-wrapper">
                <span className="team-name">{name}</span>
                <span className="team-year">{`Year of foundation: ${foundationYear}`}</span>
            </div>
        </div>
    );

    return (
        <div className="Teams-items">
            <Row gutter={[gutter, gutter]}>
                {teams?.map((item: ITeams) => (
                    <Col span={span} className="Teams-items__item-wrapper" key={item.id}>
                        <Item foundationYear={item.foundationYear} name={item.name} image={item.imageUrl} id={item.id} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TeamsItems;