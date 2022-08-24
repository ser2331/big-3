import React, { FC } from "react";
import { Field } from "../../../../common/components/field/field";
import { CustomButton } from "../../../../common/components/custom-button/custom-button";
import { DeepRequired, FieldErrorsImpl, SubmitHandler, UseFormRegister } from "react-hook-form";
import { UseFormHandleSubmit } from "react-hook-form/dist/types/form";
import { ISubmitTeams } from "../../interfaces/teams-interfaces";

import s from "./AddTeamForm.module.scss";

interface IAddTeamForm {
    register: UseFormRegister<ISubmitTeams>;
    submit: SubmitHandler<ISubmitTeams>
    handleSubmit: UseFormHandleSubmit<ISubmitTeams>;
    errors: FieldErrorsImpl<DeepRequired<ISubmitTeams>>;
    cancel: () => void;
}

export const AddTeamForm:FC<IAddTeamForm> = ({register, handleSubmit, errors, submit, cancel}) =>
    (
        <div className={s.AddTeamForm}>
            <form className={s.form} onSubmit={handleSubmit(submit)}>
                <Field
                    label="Name"
                    register={register}
                    registerName="name"
                    error={errors.name}
                    property={{required: "Enter team name"}}
                />
                <Field
                    label="Division"
                    register={register}
                    registerName="division"
                    error={errors.division}
                    property={{required: "enter division name"}}
                />
                <Field
                    label="Conference"
                    register={register}
                    registerName="conference"
                    error={errors.conference}
                />
                <Field
                    label="Year of foundation"
                    register={register}
                    registerName="foundationYear"
                    type="number"
                    error={errors.foundationYear}
                    property={{required: "enter foundation year", maxLength: {value: 10, message: "max length 10"}}}
                />

                <div className={s.formControl}>
                    <CustomButton type="reset" onClick={cancel} className={s.resetBtn}>
                        Cancel
                    </CustomButton>

                    <CustomButton type="submit">
                        Save
                    </CustomButton>
                </div>
            </form>
        </div>
    );
