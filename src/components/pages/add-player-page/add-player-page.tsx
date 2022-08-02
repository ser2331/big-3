import React from "react";
import Header from "../../common/components/header";
import Navigation from "../../common/components/navigation";
import AddPlayerContainer from "../../modules/players/components/add-player-container";

import "./add-player-page.scss";

const AddPlayerPage = () => {
    return (
        <div className="AddPlayerPage">
            <Header />

            <div className="AddPlayerPage__content">
                <Navigation />
                <AddPlayerContainer />
            </div>
        </div>
    );
};

export default AddPlayerPage;