import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {apiService} from "../../../../api/apiService";
import {IAddTeam} from "../../interfaces/ITeams";
import Field from "../../../../common/components/field";
import AddItemImg from "../../../../assests/images/addItemImg.svg";
import CustomButton from "../../../../common/components/custom-button";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";

import "./add-team-container.scss";
import {useAppSelector} from "../../../../core/redux/redux";


const AddTeamContainer = () => {
    const [addTeam, {data, isError}] = apiService.useAddTeamMutation();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues: {name: "", division: "", conference: "", year: ""}});

    const submit = async (introducedData: IAddTeam) => {
        await addTeam({...introducedData, token});
    };

    return (
        <div className="AddTeamContainer">
            <div className="AddTeamContainer__content-wrapper">
                <div className="AddTeamContainer__content-wrapper__header">
                    <span className="navigate-wrapper">
                        <Link to="/teams" className="home-link" >Teams </Link>
                        / Add new team
                    </span>
                </div>

                <div className="AddTeamContainer__content-wrapper__content">
                    <div className="image-wrapper">
                        <img alt="addItem" src={AddItemImg} />
                    </div>

                    <div className="form-wrapper">
                        <form className="form" onSubmit={handleSubmit((introducedData: any) => submit(introducedData))}>
                            <Field
                                label="Name"
                                register={register}
                                registerName="name"
                                error={errors.name}
                                property={{required: "Enter team name", maxLength: 10}}
                            />
                            <Field
                                label="Division"
                                register={register}
                                registerName="division"
                                error={errors.division}
                                property={{required: "enter division name", maxLength: 10}}
                            />
                            <Field
                                label="Conference"
                                register={register}
                                registerName="conference"
                                error={errors.conference}
                                property={{maxLength: 10}}
                            />
                            <Field
                                label="Year of foundation"
                                register={register}
                                registerName="year"
                                error={errors.year}
                                property={{maxLength: 10}}
                            />

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

export default AddTeamContainer;