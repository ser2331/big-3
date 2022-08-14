import React, {useCallback, useEffect} from "react";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../core/redux/redux";
import { ITeams } from "../../interfaces/teams-interfaces";
import { teamsSlice } from "../../TeamsSlice";
import {playersSlice} from "../../../players/PlayersSlice";
import {playersApiService} from "../../../../api/players/playersApiService";
import {getAge} from "../../../players/selectors";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultLogo from "../../../../assests/images/teamLogo.jpeg";
import avatar from "../../../../assests/images/avatar.jpg";
import ErrorMessage from "../../../../common/components/error-message";

import "./TeamCard.scss";

const { setCurrentTeam, setTeamId } = teamsSlice.actions;
const { setPlayers } = playersSlice.actions;

export const TeamCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentTeam, teamId, isMobile } = useAppSelector(state => state.teamsReducer);
    const { players } = useAppSelector(state => state.playersReducer);

    const { name, foundationYear, division, conference, imageUrl, id }: ITeams = currentTeam;
    const newTeamId = id ? [id] : undefined;

    const { data: teamData, error: teamError, isLoading: teamIsLoading, refetch } = teamsApiService.useGetTeamQuery({token, teamId});

    const {
        data: playersData,
        error: playersError,
    } = playersApiService.useGetPlayersQuery({token, teamIds: newTeamId});

    const [deleteTeam, {data, error: deleteError, isLoading: deleteIsLoading}] = teamsApiService.useDeleteTeamMutation();

    const editThisTeam = useCallback(() => {
        navigate("/teams/addTeam");
    }, [navigate]);

    const deleteThisTeam = () => {
        deleteTeam({token, id});
    };
    
    const goHome = useCallback(() => {
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
    }, [dispatch, navigate]);

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (teamData && !teamError) {
            dispatch(setCurrentTeam(teamData));
        }
        if (!teamData && !teamIsLoading) {
            goHome();
        }
    }, [dispatch, teamData, teamError, teamIsLoading]);

    useEffect(() => {
        if (playersData && !playersError) {
            dispatch(setPlayers(playersData.data));
        }
    }, [dispatch, playersData, playersError]);

    useEffect(() => {
        if (data && !deleteError && !deleteIsLoading) {
            goHome();
        }
    }, [data, deleteError, deleteIsLoading]);

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
    
    const renderTable = () => (
        <table className="Table">
            <thead className="Table__header">
                <tr>
                    <th className="number">#</th>
                    <th className="player">Player</th>
                    { !isMobile ? (
                        <>
                            <th className="desc">Height</th>
                            <th className="desc">Weight</th>
                            <th className="desc">Age</th>
                        </>
                    ) : ""}
                </tr>
            </thead>

            <tbody className="Table__body">
                {players.map((player) => {
                    const age = getAge(player.birthday);
                    return (
                        <tr key={player.id}>
                            <td>{player.number}</td>
                            <td>
                                <div className="player-wrapper">
                                    <div className="image-wrapper">
                                        <img alt="player-photo" src={player.avatarUrl || avatar}/>
                                    </div>
                                    <div className="player-name-wrapper">
                                        <div className="player-name">
                                            {player.name}
                                        </div>
                                        <div className="player-position">
                                            {player.position}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            { !isMobile ? (
                                <>
                                    <td>{`${player.height} cm`}</td>
                                    <td>{`${player.weight} kg`}</td>
                                    <td>{age}</td>
                                </>
                            ) : ""}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    return(
        <div className="TeamCard">
            <div className="TeamCard__wrapper">
                <div className="TeamCard__wrapper__header">
                    <span className="navigate-wrapper" >
                        <div className="home-link" onClick={goHome}>Teams </div> / {name}
                    </span>

                    {deleteError && <ErrorMessage message="Нельзя удалить команду, в которой есть игроки..." />}

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
                <div className="Table__title">Roster</div>
                {renderTable()}
            </div>
        </div>
    );
};
