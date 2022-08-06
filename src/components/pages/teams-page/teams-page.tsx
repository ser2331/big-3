import React from "react";
import TeamsContainer from "../../modules/teams/components/teams-container";
import Navigation from "../../common/components/navigation";
import Header from "../../common/components/header";

import "./teams-page.scss";

const TeamsPage = () => {

    return (
        <div className="TeamsPage">
            <Header />

            <div className="TeamsPage__content">
                <Navigation />
                <TeamsContainer />
            </div>
        </div>
    );
};

export default TeamsPage;