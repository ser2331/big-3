import React, {FC} from "react";
import emptyTeams from "../../../assests/images/emptyTeams.png";
import emptyPlayers from "../../../assests/images/emptyPlayers.png";

import "./empty-items.scss";

interface IEmptyItems {
    isTeamsPage?: boolean;
    isPlayersPage?: boolean;
    namePage: string;
}

const EmptyItems:FC<IEmptyItems> = ({ isTeamsPage=false, isPlayersPage=false, namePage }) => {

    const emptyTeamsImage = isTeamsPage ? emptyTeams : "";
    const emptyPlayersImage = isPlayersPage ? emptyPlayers : "";

    return (
        <div className="EmptyItems">
            <div className="EmptyItems__content">
                <img alt="emptyItems" src={emptyTeamsImage || emptyPlayersImage}/>
                <div className="title">Empty here</div>
                <div className="message">{`Add new ${namePage} to continue`}</div>
            </div>
        </div>
    );
};

export default EmptyItems;