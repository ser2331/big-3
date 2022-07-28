import React, {FC} from "react";

import "./field.scss";
import classNames from "classnames";

export enum FieldTypes {
    number = "number",
    text = "text",
    password = "password",
}

interface FieldProps {
    error?: string,
    label?: string,
    name?: string,
    type?: FieldTypes,
    value: string,
    onChange(e: React.FormEvent<HTMLInputElement>): void,
}

const Field:FC<FieldProps> = ({label, name, type, value, onChange, error}) => {
    return (
        <div className="Field">
            <label className="label">{label}</label>
            <input
                className={classNames("input", {error})}
                name={name}
                type={type}
                onChange={onChange}
                value={value}
            />
            <div className="error-massage">
                {error ? error : "" }
            </div>
        </div>
    );
};

export default Field;