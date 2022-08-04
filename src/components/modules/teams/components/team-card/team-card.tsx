import React, {useEffect} from "react";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../core/redux/redux";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultLogo from "../../../../assests/images/fakeImage.png";
import { ITeams } from "../../interfaces/teams-interfaces";
import { teamsSlice } from "../../TeamsSlice";

import "./team-card.scss";

const TeamCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentTeam, teamId } = useAppSelector(state => state.teamsReducer);
    const { name, foundationYear, division, conference, imageUrl, id }: ITeams = currentTeam;
    const { setCurrentTeam, setTeamId } = teamsSlice.actions;

    const { data: teamData, error: teamError, isLoading: teamIsLoading, refetch } = teamsApiService.useGetTeamQuery({token, teamId});
    const [deleteTeam, {data, error, isLoading}] = teamsApiService.useDeleteTeamMutation();

    const editThisTeam = () => {
        navigate("/teams/addTeam");
    };

    const deleteThisTeam = () => {
        deleteTeam({token, id});
    };
    
    const goHome = () => {
        dispatch(setCurrentTeam({
            name: "",
            foundationYear: null,
            division: "",
            conference: "",
            imageUrl: "",
            id: null,
        }));
        dispatch(setTeamId(null));
        navigate("/teams");
    };

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (teamData && !teamError) {
            dispatch(setCurrentTeam(teamData));
        }
    }, [dispatch, teamData, teamError]);

    useEffect(() => {
        if (data && !error && !isLoading) {
            navigate("/teams");
        }
    }, [data, error, isLoading]);

    const renderContent = () => (
        <>
            <div className="image-content">
                <div className="image-wrapper">
                    <img alt="teamLogo" className="team-logo" src={imageUrl || defaultLogo}/>
                </div>
            </div>

            <div className="team-description">
                <div className="title">{name}</div>

                <div className="description-wrapper">
                    <div className="left-col">
                        <div className="description-info">
                            <span className="label">Year of Foundation</span>
                            <span className="value">{foundationYear}</span>
                        </div>
                        <div className="description-info">
                            <span className="label">Conference</span>
                            <span className="value">{conference}</span>
                        </div>
                    </div>

                    <div className="right-col">
                        <div className="description-info">
                            <span className="label">Division</span>
                            <span className="value">{division}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return(
        <div className="TeamCard">
            <div className="TeamCard__wrapper">
                <div className="TeamCard__wrapper__header">
                    <span className="navigate-wrapper" >
                        <div className="home-link" onClick={goHome}>Teams </div> / {name}
                    </span>

                    <div className="control">
                        <img alt="edit" src={editIcon} onClick={editThisTeam}/>
                        <img alt="delete" src={deleteIcon} onClick={deleteThisTeam}/>
                    </div>

                </div>

                <div className="TeamCard__wrapper__content">
                    {teamIsLoading ? <div>Loading...</div> : renderContent()}
                </div>
            </div>

            <div className="TeamCard__team-players">
                <table className="Table">
                    <caption className="Table__title">Roster</caption>
                    
                    <thead className="Table__header">
                        <tr>
                            <th className="number">#</th>
                            <th className="player">Player</th>
                            <th className="desc">Height</th>
                            <th className="desc">Weight</th>
                            <th className="desc">Age</th>
                        </tr>
                    </thead>
                    
                    <tbody className="Table__body">
                        <tr>
                            <td>1</td>
                            <td>Bol Bol</td>
                            <td>218 cm</td>
                            <td>100 kg</td>
                            <td>21</td>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>Bol Bol</td>
                            <td>218 cm</td>
                            <td>100 kg</td>
                            <td>21</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamCard;