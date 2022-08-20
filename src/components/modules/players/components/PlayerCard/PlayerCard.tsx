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
import { ErrorMessage } from "../../../../common/components/error-message/error-message";
import {ITeams} from "../../../teams/interfaces/teams-interfaces";

import s from "./PlayerCard.module.scss";

const { setCurrentPlayer } = playersSlice.actions;
const { setTeams } = teamsSlice.actions;

export const PlayerCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { currentPlayer, playerId } = useAppSelector(state => state.playersReducer);
    const { teams } = useAppSelector(state => state.teamsReducer);

    const { name, birthday, height, weight, avatarUrl, number, position, team, id }: IPlayers = currentPlayer;

    const { data: teamsData, error: teamsError } = teamsApiService.useGetTeamsQuery({});
    const { data: playerData, error: playerError, isLoading: playerIsLoading, refetch } = playersApiService.useGetPlayerQuery({playerId});
    const [deletePlayer, {data: deletePlayerData, error: deleteError, isLoading: deleteIsLoading}] = playersApiService.useDeletePlayerMutation();

    const teamName = useMemo(() => teams.find((item: ITeams) => item.id === team), [team, teams]);

    const editThisPlayer = useCallback(() => {
        navigate("/players/addPlayer");
    }, [navigate]);

    const goHome = useCallback(() => {
        navigate("/players");
    }, [dispatch, navigate]);


    const deleteThisPlayer = async () => {
        if (id) {
            await deletePlayer({id});
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

    const renderDescriptionLine = (
        label?: string,
        value?: number | string | null,
        label2?: string,
        value2?: number | string | null
    ) => {
        return (
            <div className={s.DescriptionLine}>
                <div className={s.descriptionInfo}>
                    {label && <span className={s.label}>{label}</span>}
                    {value && <span className={s.value}>{value}</span>}
                </div>
                <div className={s.descriptionInfo}>
                    {label2 && <span className={s.label}>{label2}</span>}
                    {value2 && <span className={s.value}>{value2}</span>}
                </div>
            </div>
        );
    };
    
    const renderContent = () => (
        <>
            <div className={s.imageWrapper}>
                <img alt="teamLogo" className={s.playerPhoto} src={avatarUrl || defaultPlayerImg}/>
            </div>

            <div className={s.playerDescription}>
                <div className={s.title}>
                    {name}
                    <span className={s.playerNumber}>{` #${number}`}</span>
                </div>

                <div className={s.descriptionWrapper}>
                    {renderDescriptionLine("Position", position, "Team", teamName?.name)}
                    {renderDescriptionLine("Height", `${height} cm`, "Weight", `${weight} kg`)}
                    {renderDescriptionLine("Age", getAge(birthday))}
                </div>
            </div>
        </>
    );

    return(
        <div className={s.PlayerCard}>
            <div className={s.PlayerCard__wrapper}>
                <div className={s.PlayerCard__wrapper__header}>
                    <span className={s.navigateWrapper}>
                        <div className={s.homeLink} onClick={goHome}>Players </div> / {currentPlayer.name}
                    </span>

                    {deleteError && <ErrorMessage message="Что-то пошло не так..." />}

                    <div className={s.control}>
                        <img alt="edit" src={editIcon} onClick={editThisPlayer}/>
                        <img alt="delete" src={deleteIcon} onClick={deleteThisPlayer}/>
                    </div>

                </div>

                <div className={s.PlayerCard__wrapper__content}>
                    {playerIsLoading ? <div>Loading...</div> : renderContent()}
                </div>
            </div>
        </div>
    );
};
