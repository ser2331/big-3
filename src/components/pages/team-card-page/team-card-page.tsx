import React from "react";
import TeamCard from "../../modules/teams/components/team-card";
import Navigation from "../../common/components/navigation";
import Header from "../../common/components/header";

import "./team-card-page.scss";

const TeamCardPage = () => {
    return (
        <div className="TeamCardPage">
            <Header />

            <div className="TeamCardPage__content">
                <Navigation />
                <TeamCard />
            </div>
        </div>
    );
};

export default TeamCardPage;
