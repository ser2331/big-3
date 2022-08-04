import React, {FC} from "react";
import classNames from "classnames";

import "./field.scss";

export enum FieldTypes {
    number = "number",
    text = "text",
    password = "password",
    date = "date",
}

interface FieldProps {
    error?: any;
    label?: string;
    type?: FieldTypes;
    register: any;
    registerName: string;
    property?: object;
    style?: string;
    defaultValue?: string;
}

const Field:FC<FieldProps> = ({label, register, type, registerName, error, property, style, defaultValue}) => {

    return (
        <div className="Field">
            <label className="label">{label}</label>
            <input
                className={classNames("input", style, {error})}
                {...register(`${registerName}`, {...property})}
                type={type}
                defaultValue={defaultValue}
            />
            <div className="error-massage">
                {error ? error.message : "" }
            </div>
        </div>
    );
};

export default Field;