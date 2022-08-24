import React, { FC } from "react";
import { Field } from "../../../../common/components/field/field";
import { SelectField } from "../../../../common/components/select-field/select-field";
import { CustomButton } from "../../../../common/components/custom-button/custom-button";
import { ISubmitPlayer, ITeamOptions } from "../../interfaces/players-interfaces";
import { Control, DeepRequired, FieldErrorsImpl, SubmitHandler, UseFormRegister } from "react-hook-form";
import { UseFormHandleSubmit } from "react-hook-form/dist/types/form";

import s from "./AddPlayerForm.module.scss";

interface IAddPlayerForm {
    register: UseFormRegister<ISubmitPlayer>;
    submit: SubmitHandler<ISubmitPlayer>
    handleSubmit: UseFormHandleSubmit<ISubmitPlayer>;
    errors: FieldErrorsImpl<DeepRequired<ISubmitPlayer>>
    teamOptions: ITeamOptions[];
    positionOptions: ITeamOptions[];
    control: Control<ISubmitPlayer>;
}

export const AddPlayerForm:FC<IAddPlayerForm> = ({
    register, handleSubmit,
    errors, submit,
    positionOptions,
    teamOptions, control
}) =>
    (
        <div className={s.AddPlayerForm}>
            <form className={s.form} onSubmit={handleSubmit(submit)}>
                <Field
                    label="Name"
                    register={register}
                    registerName="name"
                    error={errors.name}
                    property={{required: "Enter player name"}}
                />
                <SelectField
                    label="Position"
                    name="position"
                    options={positionOptions}
                    control={control}
                    error={errors.position}
                    isClearable
                />
                <SelectField
                    label="Team"
                    name="team"
                    options={teamOptions}
                    control={control}
                    error={errors.team}
                    isClearable
                />
                <div className={s.fieldsLine}>
                    <Field
                        label="Height (cm)"
                        register={register}
                        registerName="height"
                        type="number"
                        error={errors.height}
                        property={{required: "Enter height", maxLength: {value: 5, message: "max length 5"}}}
                        style={s.Field}
                    />
                    <Field
                        label="Weight (kg)"
                        register={register}
                        registerName="weight"
                        type="number"
                        error={errors.weight}
                        property={{required: "Enter weight", maxLength: {value: 5, message: "max length 5"}}}
                        style={s.Field}
                    />
                </div>

                <div className={s.fieldsLine}>
                    <Field
                        label="Birthday"
                        register={register}
                        registerName="birthday"
                        error={errors.birthday}
                        type="date"
                        property={{required: "Enter birthday"}}
                        style={s.Field}
                    />
                    <Field
                        label="Number"
                        register={register}
                        registerName="number"
                        type="number"
                        error={errors.number}
                        property={{required: "Enter player number", maxLength: {value: 10, message: "max length 10"}}}
                        style={s.Field}
                    />
                </div>

                <div className={s.formControl}>
                    <CustomButton type="reset" className={s.resetBtn}>
                        Cancel
                    </CustomButton>

                    <CustomButton type="submit">
                        Save
                    </CustomButton>
                </div>
            </form>
        </div>
    );
