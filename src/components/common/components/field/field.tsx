import React, {FC} from "react";
import classNames from "classnames";

import "./field.scss";

export enum FieldTypes {
    number = "number",
    text = "text",
    password = "password",
}

interface FieldProps {
    error?: any | undefined,
    label?: string,
    type?: FieldTypes,
    register: any,
    registerName: string,
    property?: object,
    style?: string,
}

const Field:FC<FieldProps> = ({label, register, type, registerName, error, property, style}) => {

    return (
        <div className="Field">
            <label className="label">{label}</label>
            <input
                className={classNames("input", style, {error})}
                {...register(`${registerName}`, {...property})}
                type={type}
            />
            <div className="error-massage">
                {error ? error.message : "" }
            </div>
        </div>
    );
};

export default Field;