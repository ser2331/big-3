import React, {FC} from "react";

import "./error-message.scss";

interface IErrorMessage {
    message: string;
}

const ErrorMessage: FC<IErrorMessage> = ({message}) => {
    return (
        <div className="Error-message">
            {message}
        </div>
    );
};

export default ErrorMessage;