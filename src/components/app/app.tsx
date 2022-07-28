import React, {FC} from "react";
import AuthContainer from "../modules/authorization/components/auth-container";

import "./app.css";

const App: FC = () => {
    return(
        <div className="App">
            <AuthContainer />
        </div>
    );
};

export default App;
