import React, {FC} from "react";
import classNames from "classnames";

import "./custom-button.scss";

export enum ButtonTypes {
    button = "button",
    submit = "submit",
    reset = "reset"
}

interface CustomButtonProps {
    disabled?: boolean,
    children: string,
    className?: string,
    type: ButtonTypes,
    onClick?: () => void
}

const CustomButton:FC<CustomButtonProps> = ({onClick, children, className, type, disabled}) => (
    <button
        className={classNames("SubmitButton", className)}
        onClick={onClick}
        type={type}
        disabled={disabled}
    >
        {children}
    </button>
);

export default CustomButton;