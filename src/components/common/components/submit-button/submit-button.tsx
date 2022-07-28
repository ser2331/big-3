import React, {FC} from "react";
import classNames from "classnames";

import "./submit-button.scss";

export enum ButtonTypes {
    button = "button",
    submit = "submit",
    reset = "reset"
}

interface SubmitButtonProps {
    disabled?: boolean,
    children: string,
    className?: string,
    type: ButtonTypes,
    onClick?: () => void
}

const SubmitButton:FC<SubmitButtonProps> = ({onClick, children, className, type, disabled}) => (
    <button
        className={classNames("SubmitButton", className)}
        onClick={onClick}
        type={type}
        disabled={disabled}
    >
        {children}
    </button>
);

export default SubmitButton;