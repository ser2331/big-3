import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Field from "../../../../common/components/field";
import AddItemImg from "../../../../assests/images/addItemImg.svg";
import CustomButton from "../../../../common/components/custom-button";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";

import "./add-player-container.scss";

const AddPlayerContainer = () => {
    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues: {name: "", position: "", team: "", height: "", weight: "", birthday: "", number: ""}});

    return (
        <div className="AddPlayerContainer">
            <div className="AddPlayerContainer__content-wrapper">
                <div className="AddTeamContainer__content-wrapper__header">
                    <span className="navigate-wrapper">
                        <Link to="/players" className="home-link" >Players </Link>
                        / Add new player
                    </span>
                </div>

                <div className="AddPlayerContainer__content-wrapper__content">
                    <div className="image-wrapper">
                        <img alt="addItem" src={AddItemImg} />
                    </div>

                    <div className="form-wrapper">
                        <form className="form" onSubmit={handleSubmit((data) => {alert(JSON.stringify(data));})}>
                            <Field
                                label="Name"
                                register={register}
                                registerName="name"
                                error={errors.name}
                                property={{required: "Enter team name", maxLength: 10}}
                            />
                            <Field
                                label="Position"
                                register={register}
                                registerName="position"
                                error={errors.position}
                            />
                            <Field
                                label="Team"
                                register={register}
                                registerName="team"
                                error={errors.team}
                            />

                            <div className="fields-line">
                                <Field
                                    label="Height (cm)"
                                    register={register}
                                    registerName="height"
                                    error={errors.height}
                                />
                                <Field
                                    label="Weight (kg)"
                                    register={register}
                                    registerName="weight"
                                    error={errors.weight}
                                />
                            </div>

                            <div className="fields-line">
                                <Field
                                    label="Birthday"
                                    register={register}
                                    registerName="birthday"
                                    error={errors.birthday}
                                />
                                <Field
                                    label="Number"
                                    register={register}
                                    registerName="number"
                                    error={errors.number}
                                />
                            </div>

                            <div className="form-control">
                                <CustomButton type={ButtonTypes.reset} className="reset-btn">
                                    Cancel
                                </CustomButton>

                                <CustomButton type={ButtonTypes.submit}>
                                    Save
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlayerContainer;