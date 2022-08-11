import React, {FC} from "react";
import classNames from "classnames";

import "./field.scss";

interface FieldProps {
    error?: any;
    label?: string;
    type?: "number" | "text" | "password" | "date";
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