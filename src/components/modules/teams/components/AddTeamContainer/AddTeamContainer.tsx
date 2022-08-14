import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { teamsSlice } from "../../TeamsSlice";
import axios from "axios";
import { IAddTeam, ITeams } from "../../interfaces/teams-interfaces";
import Field from "../../../../common/components/field";
import CustomButton from "../../../../common/components/custom-button";
import ErrorMessage from "../../../../common/components/error-message";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";
import { baseUrl } from "../../../../api/authService/authService";

import "./AddTeamContainer.scss";

export const AddTeamContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const newImage = avatar ? baseUrl + avatar : "";

    const sendFile = React.useCallback(async (event: React.ChangeEvent) => {
        const target= event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : "";
        try {
            const data = new FormData();
            data.append("file", file);

            await axios.post(baseUrl + "/api/Image/SaveImage", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => setAvatar(res.data));

        } catch (err) {
            console.log(err);
        }
    }, []);

    const [addTeam, {data: addTeamData, error: addTeamError}] = teamsApiService.useAddTeamMutation();
    const [editTeam, {data: editData, error: editTeamError}] = teamsApiService.useEditTeamMutation();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentTeam } = useAppSelector(state => state.teamsReducer);
    const { name, foundationYear, division, conference, imageUrl, id }: ITeams = currentTeam;
    const { setCurrentTeam, setTeamId } = teamsSlice.actions;

    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues: {
        name: name || "",
        division: division || "",
        conference: conference || "",
        foundationYear: foundationYear || null,
        imageUrl: imageUrl || "",
    }});

    const submit = async (introducedData: IAddTeam) => {
        if (id) {
            await editTeam({...introducedData, imageUrl: newImage|| imageUrl, token, id});
        } else {
            await addTeam({...introducedData, imageUrl: newImage|| imageUrl, token});
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
        if ((addTeamData && !addTeamError) || (editData && !editTeamError)) {
            navigate("/teams");
        }
    }, [addTeamData, addTeamError, editData, editTeamError]);

    return (
        <div className="AddTeamContainer">
            <div className="AddTeamContainer__content-wrapper">
                <div className="AddTeamContainer__content-wrapper__header">
                    {addTeamError || editTeamError ? <ErrorMessage message="Что-то пошло не так..." /> : ""}

                    <span className="navigate-wrapper">
                        <div className="home-link" onClick={goHome}>Teams </div> / Add new team
                    </span>
                </div>

                <div className="AddTeamContainer__content-wrapper__content">
                    <div className="image">
                        <div className="image-wrapper" >
                            <label className="custom-file-upload" htmlFor="file-upload" />
                            <input type="file" onChange={sendFile} id="file-upload" className="upload" />

                            {newImage || imageUrl ? <img className="new-image" alt="addItem" src={newImage || imageUrl} /> : ""}
                        </div>
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
                            />
                            <Field
                                label="Year of foundation"
                                register={register}
                                registerName="foundationYear"
                                type="number"
                                error={errors.foundationYear}
                                property={{required: "enter foundation year"}}
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
