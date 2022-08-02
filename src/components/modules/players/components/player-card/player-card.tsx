import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSelectedPlayer } from "../../selectors";
import { IPlayers } from "../../interfaces/players-interfaces";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultPlayerImg from "../../../../assests/images/defaultPlayerImage.png";

import "./player-card.scss";

const PlayerCard = () => {
    const navigate = useNavigate();

    const player = useSelector(getSelectedPlayer);

    const { name, birthday, height, weight, avatarUrl, number, position, team }: IPlayers = player;

    useEffect(() => {
        if (Object.keys(player).length == 0) {
            navigate("/players");
        }
    }, [player]);

    const renderDescriptionLine = (
        label?: string,
        value?: number | string,
        label2?: string ,
        value2?: number | string
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

    return(
        <div className="PlayerCard">
            <div className="PlayerCard__wrapper">
                <div className="PlayerCard__wrapper__header">
                    <span className="navigate-wrapper">
                        <Link to="/players" className="home-link" >Players </Link>
                        / Denver Nuggets
                    </span>

                    <div className="control">
                        <img alt="edit" src={editIcon}/>
                        <img alt="delete" src={deleteIcon}/>
                    </div>

                </div>

                <div className="PlayerCard__wrapper__content">
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
                            {renderDescriptionLine("Age", birthday)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;