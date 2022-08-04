import React, {FC} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Controller } from "react-hook-form";

import "./select-field.scss";

interface option {
    value: string | number | null;
}

interface SearchFieldTypes {
    error?: any;
    label?: string;
    name: string;
    options: option[];
    control: any;
    isMulti?: boolean;
    defaultValue?: string | number | null;
}

const SelectField:FC<SearchFieldTypes> = ({ label, name, error, options, control, isMulti, defaultValue }) => {
    const animatedComponents = makeAnimated();

    return (
        <div className="SearchField Field">
            <label className="label">{label}</label>

            <Controller
                name={name}
                render={({ field }) => (
                    <Select
                        {...field}
                        isMulti={isMulti}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        classNamePrefix="Multi-selector"
                        options={options}
                    />
                )}
                control={control}
                defaultValue={defaultValue}
            />

            <div className="error-massage">
                {error ? error.message : "" }
            </div>
        </div>
    );
};

export default SelectField;