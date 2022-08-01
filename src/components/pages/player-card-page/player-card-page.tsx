import React from "react";
import Navigation from "../../common/components/navigation";
import Header from "../../common/components/header";
import PlayerCard from "../../modules/players/components/player-card";

import "./player-card-page.scss";

const PlayerCardPage = () => {
    return (
        <div className="PlayerCardPage">
            <Header />

            <div className="PlayerCardPage__content">
                <Navigation />
                <PlayerCard />
            </div>
        </div>
    );
};

export default PlayerCardPage;
