import React from "react";
import Header from "../../common/components/header";
import Navigation from "../../common/components/navigation";
import AddTeamContainer from "../../modules/teams/components/add-team-container";

import "./add-team-page.scss";


const AddTeamPage = () => {
    return (
        <div className="AddTeamPage">
            <Header />

            <div className="AddTeamPage__content">
                <Navigation />
                <AddTeamContainer />
            </div>
        </div>
    );
};

export default AddTeamPage;