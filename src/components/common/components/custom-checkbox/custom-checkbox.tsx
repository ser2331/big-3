import React, {FC} from "react";
import classNames from "classnames";
import checkboxChecked from "../../../assests/images/checkbox.png";

import "./custom-checkbox.scss";

interface CustomCheckbox {
    checked: boolean,
    error?: string,
    onChange(checked: boolean): void,
}

export const CustomCheckbox:FC<CustomCheckbox> = ({ checked, onChange, error }) => (

    <div className="CustomCheckbox" onClick={() => onChange(!checked)}>
        <div className="checkbox-wrapper">
            <div className={classNames("checkbox", { checked }, {error})} />
            {checked ? <img className="checked-image" alt="checked" src={checkboxChecked}/> : ""}
            <span className={classNames("description" , {error})}>I accept the agreement</span>
        </div>
        <div className="error-wrapper">
            {error ? error : ""}
        </div>

    </div>
);
