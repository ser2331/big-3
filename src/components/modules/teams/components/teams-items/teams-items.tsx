import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { apiService } from "../../../../api/apiService";
import { teamsSlice } from "../../TeamsSlice";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { ITeamItemProps, ITeams } from "../../interfaces/ITeams";
import fakeImage from "../../../../assests/images/fakeImage.png";

import "./teams-items.scss";

const TeamsItems:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teamId, currentTeam } = useAppSelector(state => state.teamsReducer);
    const { setTeamId, setCurrentTeam } = teamsSlice.actions;
    const { data: data, error, isLoading, isFetching } = apiService.useGetTeamQuery({token, teamId});

    const { teams } = useAppSelector(state => state.teamsReducer);

    const setItemId = (id: number) => {
        dispatch(setTeamId(id));
    };

    useEffect(() => {
        if (data && (data !== currentTeam) && !error && !isFetching && !isLoading) {
            dispatch(setCurrentTeam(data));
            navigate(`team:${data.id}`);
        }
    }, [data, error, isFetching, isLoading]);

    const Item:FC<ITeamItemProps> = ({name, year, image, id}) =>  (
        <div className="TeamItem" onClick={() => setItemId(id)}>
            <div className="image-wrapper">
                <img alt="teamImage" src={image || fakeImage}/>
            </div>
            <div className="description-wrapper">
                <span className="team-name">{name}</span>
                <span className="team-year">{`Year of foundation: ${year}`}</span>
            </div>
        </div>
    );

    return (
        <div className="Teams-items">
            <Row gutter={[24, 24]}>
                {teams?.map((item: ITeams) => (
                    <Col span={6} className="Teams-items__item-wrapper" key={item.id}>
                        <Item year={item.imageUrl} name={item.name} image={item.imageUrl} id={item.id} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TeamsItems;