import React, { FC } from "react";
import { useAppSelector } from "../../../../core/redux/redux";
import { Col, Row } from "antd";
import { ITeamItemProps, ITeams, ITeamsItems } from "../../interfaces/teams-interfaces";
import fakeImage from "../../../../assests/images/fakeImage.png";

import "./teams-items.scss";

const TeamsItems:FC<ITeamsItems> = ({ setItemId } ) => {

    const { teams } = useAppSelector(state => state.teamsReducer);

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
            <Row gutter={[24, 24]}>
                {teams?.map((item: ITeams) => (
                    <Col span={6} className="Teams-items__item-wrapper" key={item.id}>
                        <Item foundationYear={item.foundationYear} name={item.name} image={item.imageUrl} id={item.id} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TeamsItems;