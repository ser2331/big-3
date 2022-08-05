import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { playersSlice } from "../../PlayersSlice";
import { playersApiService } from "../../../../api/players/playersApiService";
import { IPlayers } from "../../interfaces/players-interfaces";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultPlayerImg from "../../../../assests/images/defaultPlayerImage.png";

import "./player-card.scss";

const PlayerCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentPlayer, playerId } = useAppSelector(state => state.playersReducer);
    const { setCurrentPlayer } = playersSlice.actions;
    const { name, birthday, height, weight, avatarUrl, number, position, team, id }: IPlayers = currentPlayer;


    const getAge = (dateString: string) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();

        let m = today.getMonth() - birthDate.getMonth();
        const d = today.getDay() - birthDate.getDay();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if ( age === 0 ) {
            m = 12 + m;
            if (d < 0 || (d === 0 && today.getDate() < birthDate.getDate())) {
                m--;
            }
        }

        return age ? age + " г." : m + "м";
    };

    const { data: playerData, error: playerError, isLoading: playerIsLoading, refetch } = playersApiService.useGetPlayerQuery({token, playerId});
    const [deletePlayer, {data, error, isLoading}] = playersApiService.useDeletePlayerMutation();

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
        if (data && !error && !isLoading) {
            navigate("/players");
        }
    }, [data, error, isLoading]);

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