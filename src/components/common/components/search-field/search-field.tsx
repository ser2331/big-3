import React, {FC} from "react";
import classNames from "classnames";

import "./search-field.scss";

interface FieldProps {
    name?: string,
    value: string,
    className?: string,
    classNameWrapper?: string,
    onChange(text: string): void,
}

const SearchField:FC<FieldProps> = ({value, onChange, className, classNameWrapper}) => {
    return (
        <div className={classNames("SearchField", classNameWrapper)}>
            <input
                className={classNames("input", className)}
                type="text"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchField;