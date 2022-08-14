import React, { FC } from "react";
import Field from "../../../../common/components/field";
import SelectField from "../../../../common/components/select-field";
import CustomButton from "../../../../common/components/custom-button";
import { ISubmitPlayer, ITeamOptions } from "../../interfaces/players-interfaces";
import { Control, DeepRequired, FieldErrorsImpl, SubmitHandler, UseFormRegister } from "react-hook-form";
import { UseFormHandleSubmit } from "react-hook-form/dist/types/form";

import "./AddPlayerForm.scss";

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
}) => (
    <div className="AddPlayerForm">
        <form className="form" onSubmit={handleSubmit(submit)}>
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
            <div className="fields-line">
                <Field
                    label="Height (cm)"
                    register={register}
                    registerName="height"
                    type="number"
                    error={errors.height}
                    property={{required: "Enter height"}}
                />
                <Field
                    label="Weight (kg)"
                    register={register}
                    registerName="weight"
                    type="number"
                    error={errors.weight}
                    property={{required: "Enter weight"}}
                />
            </div>

            <div className="fields-line">
                <Field
                    label="Birthday"
                    register={register}
                    registerName="birthday"
                    error={errors.birthday}
                    type="date"
                    property={{required: "Enter birthday"}}
                />
                <Field
                    label="Number"
                    register={register}
                    registerName="number"
                    type="number"
                    error={errors.number}
                    property={{required: "Enter player number"}}
                />
            </div>

            <div className="form-control">
                <CustomButton type="reset" className="reset-btn">
                    Cancel
                </CustomButton>

                <CustomButton type="submit">
                    Save
                </CustomButton>
            </div>
        </form>
    </div>
);
