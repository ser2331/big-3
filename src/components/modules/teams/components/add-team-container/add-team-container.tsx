import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { teamsSlice } from "../../TeamsSlice";
import { IAddTeam, ITeams } from "../../interfaces/ITeams";
import Field from "../../../../common/components/field";
import AddItemImg from "../../../../assests/images/addItemImg.svg";
import CustomButton from "../../../../common/components/custom-button";
import ErrorMessage from "../../../../common/components/error-message";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";

import "./add-team-container.scss";

const AddTeamContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showImageField, setShowImageField] = useState(false);
    const [addTeam, {data, isError}] = teamsApiService.useAddTeamMutation();
    const [editTeam, {data: editData, error, isLoading: loading}] = teamsApiService.useEditTeamMutation();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentTeam } = useAppSelector(state => state.teamsReducer);
    const { name, foundationYear, division, conference, imageUrl, id }: ITeams = currentTeam;
    const { setCurrentTeam, setTeamId } = teamsSlice.actions;

    const {register, handleSubmit, getValues, formState: { errors }} = useForm({defaultValues: {
        name: name || "",
        division: division || "",
        conference: conference || "",
        foundationYear: foundationYear || null,
        imageUrl: imageUrl || "",
    }});


    const submit = async (introducedData: IAddTeam) => {
        if (id) {
            await editTeam({...introducedData, token, id});
        } else {
            await addTeam({...introducedData, token});
        }
    };

    const goHome = () => {
        dispatch(setCurrentTeam({
            name: "",
            foundationYear: null,
            division: "",
            conference: "",
            imageUrl: "",
            id: null,
        }));
        dispatch(setTeamId(null));
        navigate("/teams");
    };

    useEffect(() => {
        if ((data && !isError) || (editData && !error)) {
            navigate("/teams");
        }
    }, [data, isError, editData, error]);

    return (
        <div className="AddTeamContainer">
            <div className="AddTeamContainer__content-wrapper">
                <div className="AddTeamContainer__content-wrapper__header">
                    {isError ? <ErrorMessage message="Что-то пошло не так..." /> : ""}

                    <span className="navigate-wrapper">
                        <div className="home-link" onClick={goHome}>Teams </div> / Add new team
                    </span>
                </div>

                <div className="AddTeamContainer__content-wrapper__content">
                    <div className="image">
                        <div className="image-wrapper" >
                            <img
                                alt="addItem"
                                className="add-item"
                                src={AddItemImg}
                                onClick={() => setShowImageField(!showImageField)}
                            />

                            {getValues().imageUrl ? <img className="new-image" alt="addItem" src={getValues().imageUrl} /> : ""}
                        </div>

                        {showImageField ? (
                            <div className="image-url-wrapper">
                                <Field style="image-url" registerName="imageUrl" register={register} />
                                <div className="set-image-btn" onClick={() => setShowImageField(false)}>OK</div>
                            </div>
                        ) : ""}
                    </div>


                    <div className="form-wrapper">
                        <form className="form" onSubmit={handleSubmit((introducedData: any) => submit(introducedData))}>
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
                                property={{maxLength: 10}}
                            />
                            <Field
                                label="Year of foundation"
                                register={register}
                                registerName="foundationYear"
                                error={errors.foundationYear}
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