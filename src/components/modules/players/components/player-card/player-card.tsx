import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { playersSlice } from "../../PlayersSlice";
import { playersApiService } from "../../../../api/players/playersApiService";
import { IPlayers } from "../../interfaces/players-interfaces";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultPlayerImg from "../../../../assests/images/avatar.jpg";
import { getAge } from "../../selectors";

import "./player-card.scss";
import ErrorMessage from "../../../../common/components/error-message";

const PlayerCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentPlayer, playerId } = useAppSelector(state => state.playersReducer);
    const { setCurrentPlayer } = playersSlice.actions;
    const { name, birthday, height, weight, avatarUrl, number, position, team, id }: IPlayers = currentPlayer;

    const { data: playerData, error: playerError, isLoading: playerIsLoading, refetch } = playersApiService.useGetPlayerQuery({token, playerId});
    const [deletePlayer, {data, error: deleteError, isLoading: deleteIsLoading}] = playersApiService.useDeletePlayerMutation();

    const editThisPlayer = () => {
        navigate("/players/addPlayer");
    };

    const deleteThisPlayer = () => {
        deletePlayer({token, id});
    };

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (playerData && !playerError) {
            dispatch(setCurrentPlayer(playerData));
        }

        if (!playerData && !playerIsLoading) {
            navigate("/players");
        }
    }, [dispatch, playerData, playerError, playerIsLoading]);

    useEffect(() => {
        if (data && !deleteError && !deleteIsLoading) {
            navigate("/players");
        }
    }, [data, deleteError, deleteIsLoading]);

    const renderDescriptionLine = (
        label?: string,
        value?: number | string | null,
        label2?: string ,
        value2?: number | string | null
    ) => {
        return (
            <div className="Description-line">
                <div className="description-info">
                    <span className="label">{label}</span>
                    <span className="value">{value}</span>
                </div>
                <div className="description-info">
                    <span className="label">{label2}</span>
                    <span className="value">{value2}</span>
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
                    {renderDescriptionLine("Position", position, "Team", team)}
                    {renderDescriptionLine("Height", height, "Weight", weight)}
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
                        <Link to="/players" className="home-link" >Players </Link>
                        / Denver Nuggets
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

export default PlayerCard;