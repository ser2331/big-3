import React, { useCallback, useEffect } from "react";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../core/redux/redux";
import { ITeams } from "../../interfaces/teams-interfaces";
import { teamsSlice } from "../../TeamsSlice";
import { playersSlice } from "../../../players/PlayersSlice";
import { playersApiService } from "../../../../api/players/playersApiService";
import { getAge } from "../../../players/selectors";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultLogo from "../../../../assests/images/teamLogo.jpeg";
import avatar from "../../../../assests/images/avatar.jpg";
import { ErrorMessage } from "../../../../common/components/error-message/error-message";

import s from "./TeamCard.module.scss";

const { setCurrentTeam } = teamsSlice.actions;
const { setPlayers } = playersSlice.actions;

export const TeamCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentTeam, teamId } = useAppSelector(state => state.teamsReducer);
    const { isMobile } = useAppSelector(state => state.appReducer);
    const { players } = useAppSelector(state => state.playersReducer);

    const { name, foundationYear, division, conference, imageUrl, id }: ITeams = currentTeam;
    const newTeamId = id ? [id] : undefined;

    const { data: teamData, error: teamError, isLoading: teamIsLoading, refetch } = teamsApiService.useGetTeamQuery({teamId});

    const {
        data: playersData,
        error: playersError,
    } = playersApiService.useGetPlayersQuery({teamIds: newTeamId});

    const [deleteTeam, {data, error: deleteError, isLoading: deleteIsLoading}] = teamsApiService.useDeleteTeamMutation();

    const editThisTeam = useCallback(() => {
        navigate("/teams/addTeam");
    }, [navigate]);

    const deleteThisTeam = async () => {
        if (id) {
            await deleteTeam({id});
        }
    };

    const goHome = useCallback(() => {
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

    const renderContent = useCallback(() => (
        <>
            <div className={s.imageContent}>
                <div className={s.imageWrapper}>
                    <img alt="teamLogo" className={s.teamLogo} src={imageUrl || defaultLogo}/>
                </div>
            </div>

            <div className={s.teamDescription}>
                <div className={s.title}>{name}</div>

                <div className={s.descriptionWrapper}>
                    <div className={s.leftCol}>
                        <div className={s.descriptionInfo}>
                            <span className={s.label}>Year of Foundation</span>
                            <span className={s.value}>{foundationYear}</span>
                        </div>
                        <div className={s.descriptionInfo}>
                            <span className={s.label}>Conference</span>
                            <span className={s.value}>{conference}</span>
                        </div>
                    </div>

                    <div className={s.rightCol}>
                        <div className={s.descriptionInfo}>
                            <span className={s.label}>Division</span>
                            <span className={s.value}>{division}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ), [currentTeam]);
    
    const renderTable = useCallback(() => (
        <table className={s.Table}>
            <thead className={s.Table__header}>
                <tr>
                    <th className={s.number}>#</th>
                    <th className={s.player}>Player</th>
                    { !isMobile ? (
                        <>
                            <th className={s.desc}>Height</th>
                            <th className={s.desc}>Weight</th>
                            <th className={s.desc}>Age</th>
                        </>
                    ) : ""}
                </tr>
            </thead>

            <tbody className={s.Table__body}>
                {players.map((player) => {
                    const age = getAge(player.birthday);
                    return (
                        <tr key={player.id}>
                            <td>{player.number}</td>
                            <td>
                                <div className={s.playerWrapper}>
                                    <div className={s.imageWrapper}>
                                        <img alt="player-photo" src={player.avatarUrl || avatar}/>
                                    </div>
                                    <div className={s.playerNameWrapper}>
                                        <div className={s.playerName}>
                                            {player.name}
                                        </div>
                                        <div className={s.playerPosition}>
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
    ), [players, isMobile]);

    return(
        <div className={s.TeamCard}>
            <div className={s.TeamCard__wrapper}>
                <div className={s.TeamCard__wrapper__header}>
                    <span className={s.navigateWrapper} >
                        <div className={s.homeLink} onClick={goHome}>Teams </div> / {name}
                    </span>

                    {deleteError && <ErrorMessage message="Нельзя удалить команду, в которой есть игроки..." />}

                    <div className={s.control}>
                        <img alt="edit" src={editIcon} onClick={editThisTeam}/>
                        <img alt="delete" src={deleteIcon} onClick={deleteThisTeam}/>
                    </div>

                </div>

                <div className={s.TeamCard__wrapper__content}>
                    {teamIsLoading ? <div>Loading...</div> : renderContent()}
                </div>
            </div>

            <div className={s.TeamCard__teamPlayers}>
                <div className={s.Table__title}>Roster</div>
                {renderTable()}
            </div>
        </div>
    );
};
