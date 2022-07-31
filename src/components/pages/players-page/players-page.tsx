import React from "react";
import PlayersContainer from "../../modules/players/components/players-container";
import Navigation from "../../common/components/navigation";
import Header from "../../common/components/header";

import "./players-page.scss";

const PlayersPage = () => {

    return (
        <div className="PlayersPage">
            <Header/>

            <div className="PlayersPage__content">
                <Navigation/>
                <PlayersContainer/>
            </div>
        </div>
    );
};

export default PlayersPage;
