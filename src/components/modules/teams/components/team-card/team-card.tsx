import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSelectedTeam } from "../../selectors";
import editIcon from "../../../../assests/images/editImage.png";
import deleteIcon from  "../../../../assests/images/deleteIcon.png";
import defaultLogo from "../../../../assests/images/fakeImage.png";
import { ITeams } from "../../interfaces/ITeams";

import "./team-card.scss";

const TeamCard = () => {
    const navigate = useNavigate();

    const team = useSelector(getSelectedTeam);

    const {name, foundationYear, division, conference, imageUrl }: ITeams = team;

    useEffect(() => {
        if (Object.keys(team).length == 0) {
            navigate("/teams");
        }
    }, [team]);

    return(
        <div className="TeamCard">
            <div className="TeamCard__wrapper">
                <div className="TeamCard__wrapper__header">
                    <span className="navigate-wrapper">
                        <Link to="/teams" className="home-link" >Teams </Link>
                        / Denver Nuggets
                    </span>

                    <div className="control">
                        <img alt="edit" src={editIcon}/>
                        <img alt="delete" src={deleteIcon}/>
                    </div>

                </div>

                <div className="TeamCard__wrapper__content">
                    <div className="image-wrapper">
                        <img alt="teamLogo" className="team-logo" src={imageUrl || defaultLogo}/>
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