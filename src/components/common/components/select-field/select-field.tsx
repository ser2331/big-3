import React, {FC} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Control, Controller, DeepRequired, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ISubmitPlayer } from "../../../modules/players/interfaces/players-interfaces";

import "./select-field.scss";

interface option {
    value: string | number | null;
}

interface SearchFieldTypes {
    error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<{ label: string; value: string; }>>>;
    label?: string;
    name: "number" | "name" | "avatarUrl" | "position" | "team" | "height" | "weight" | "birthday" | "position.label" | "position.value" | "team.label" | "team.value";
    options: option[];
    control: Control<ISubmitPlayer>;
    isMulti?: boolean;
    defaultValue?: string | number | null;
    isClearable: boolean;
}

export const SelectField:FC<SearchFieldTypes> = ({ label, name, error, options, control, isMulti, defaultValue, isClearable }) => {
    const animatedComponents = makeAnimated();

    return (
        <div className="SelectField Field">
            <label className="label">{label}</label>

            <Controller
                name={name}
                render={({ field }) => (
                    <Select
                        {...field}
                        isMulti={isMulti}
                        components={animatedComponents}
                        classNamePrefix="Multi-selector"
                        options={options}
                        isClearable={isClearable}
                    />
                )}
                control={control}
                defaultValue={defaultValue}
            />

            <div className="error-message">
                {error ? error.message : "" }
            </div>
        </div>
    );
};
