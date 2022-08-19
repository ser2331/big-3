import React, {FC} from "react";
import classNames from "classnames";

import s from "./field.module.scss";

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

export const Field:FC<FieldProps> = ({label, register, type, registerName, error, property, style, defaultValue}) => {

    return (
        <div className={s.Field}>
            <label className={s.label}>{label}</label>
            <input
                className={classNames(s.input, style && style, error && s.error)}
                {...register(`${registerName}`, {...property})}
                type={type}
                defaultValue={defaultValue}
            />
            <div className={s.errorMessage}>
                {error ? error.message : "" }
            </div>
        </div>
    );
};
