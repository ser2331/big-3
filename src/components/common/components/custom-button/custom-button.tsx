import React, {FC} from "react";
import classNames from "classnames";

import "./custom-button.scss";

interface CustomButtonProps {
    disabled?: boolean,
    children: string,
    className?: string,
    type: "button" | "submit" | "reset",
    onClick?: () => void
}

const CustomButton:FC<CustomButtonProps> = ({onClick, children, className, type, disabled}) => (
    <button
        className={classNames("CustomButton", type, className)}
        onClick={onClick}
        type={type}
        disabled={disabled}
    >
        {children}
    </button>
);

export default CustomButton;