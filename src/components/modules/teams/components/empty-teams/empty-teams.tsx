import React from "react";
import emptyTeams from "../../../../assests/images/emptyTeams.png";
import "./empty-teams.scss";

const EmptyTeams = () => {
    return (
        <div className="EmptyTeams">
            <div className="EmptyTeams__content">
                <img alt="emptyTeams" src={emptyTeams}/>
                <div className="title">Empty here</div>
                <div className="message">Add new teams to continue</div>
            </div>
        </div>
    );
};

export default EmptyTeams;