import React, {FC} from "react";
import classNames from "classnames";

import s from "./search-field.module.scss";

interface FieldProps {
    name?: string,
    value: string,
    className?: string,
    classNameWrapper?: string,
    onChange(text: string): void,
}

export const SearchField:FC<FieldProps> = ({value, onChange, className, classNameWrapper}) => {
    return (
        <div className={classNames(s.SearchField, classNameWrapper)}>
            <input
                className={classNames(s.input, className)}
                type="text"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder="Search..."
            />
        </div>
    );
};
