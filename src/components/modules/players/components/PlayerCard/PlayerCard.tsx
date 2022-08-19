import React, {useCallback, useEffect, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { playersSlice } from "../../PlayersSlice";
import { playersApiService } from "../../../../api/players/playersApiService";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { teamsSlice } from "../../../teams/TeamsSlice";
import { IPlayers } from "../../interfaces/players-interfaces";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultPlayerImg from "../../../../assests/images/avatar.jpg";
import { getAge } from "../../selectors";
import ErrorMessage from "../../../../common/components/error-message";
import {ITeams} from "../../../teams/interfaces/teams-interfaces";

import "./PlayerCard.scss";

const { setCurrentPlayer, resetPlayersInformation } = playersSlice.actions;
const { setTeams } = teamsSlice.actions;

export const PlayerCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentPlayer, playerId } = useAppSelector(state => state.playersReducer);
    const { teams } = useAppSelector(state => state.teamsReducer);

    const { name, birthday, height, weight, avatarUrl, number, position, team, id }: IPlayers = currentPlayer;

    const { data: teamsData, error: teamsError } = teamsApiService.useGetTeamsQuery({token});
    const { data: playerData, error: playerError, isLoading: playerIsLoading, refetch } = playersApiService.useGetPlayerQuery({token, playerId});
    const [deletePlayer, {data: deletePlayerData, error: deleteError, isLoading: deleteIsLoading}] = playersApiService.useDeletePlayerMutation();

    const teamName = useMemo(() => teams.find((item: ITeams) => item.id === team), [team]);

    const editThisPlayer = useCallback(() => {
        navigate("/players/addPlayer");
    }, [navigate]);

    const goHome = useCallback(() => {
        navigate("/players");
    }, [dispatch, navigate]);


    const deleteThisPlayer = async () => {
        if (id && token) {
            await deletePlayer({token, id});
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (playerData && !playerError) {
            dispatch(setCurrentPlayer(playerData));
        }

        if (!playerData && !playerIsLoading) {
            goHome();
        }
    }, [dispatch, playerData, playerError, playerIsLoading]);

    useEffect(() => {
        if (teamsData && !teamsError) {
            dispatch(setTeams(teamsData.data));
        }
    }, [dispatch, teamsData, teamsError]);

    useEffect(() => {
        if (deletePlayerData && !deleteError && !deleteIsLoading) {
            goHome();
        }
    }, [deletePlayerData, deleteError, deleteIsLoading]);

    useEffect(() => {
        return () => {
            dispatch(resetPlayersInformation());
        };
    }, []);

    const renderDescriptionLine = (
        label?: string,
        value?: number | string | null,
        label2?: string,
        value2?: number | string | null
    ) => {
        return (
            <div className="Description-line">
                <div className="description-info">
                    {label && <span className="label">{label}</span>}
                    {value && <span className="value">{value}</span>}
                </div>
                <div className="description-info">
                    {label2 && <span className="label">{label2}</span>}
                    {value2 && <span className="value">{value2}</span>}
                </div>
            </div>
        );
    };
    
    const renderContent = () => (
        <>
            <div className="image-wrapper">
                <img alt="teamLogo" className="player-photo" src={avatarUrl || defaultPlayerImg}/>
            </div>

            <div className="player-description">
                <div className="title">
                    {name}
                    <span className="player-number">{` #${number}`}</span>
                </div>

                <div className="description-wrapper">
                    {renderDescriptionLine("Position", position, "Team", teamName?.name)}
                    {renderDescriptionLine("Height", `${height} cm`, "Weight", `${weight} kg`)}
                    {renderDescriptionLine("Age", getAge(birthday))}
                </div>
            </div>
        </>
    );

    return(
        <div className="PlayerCard">
            <div className="PlayerCard__wrapper">
                <div className="PlayerCard__wrapper__header">
                    <span className="navigate-wrapper">
                        <div className="home-link" onClick={goHome}>Players </div> / {currentPlayer.name}
                    </span>

                    {deleteError && <ErrorMessage message="Что-то пошло не так..." />}

                    <div className="control">
                        <img alt="edit" src={editIcon} onClick={editThisPlayer}/>
                        <img alt="delete" src={deleteIcon} onClick={deleteThisPlayer}/>
                    </div>

                </div>

                <div className="PlayerCard__wrapper__content">
                    {playerIsLoading ? <div>Loading...</div> : renderContent()}
                </div>
            </div>
        </div>
    );
};
