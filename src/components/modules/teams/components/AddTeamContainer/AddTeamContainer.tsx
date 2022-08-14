import React, {useCallback, useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { teamsSlice } from "../../TeamsSlice";
import { AddTeamForm } from "../AddTeamForm/AddTeamForm";
import { AddImage } from "../../../../common/components/AddImage/AddImage";
import { ISubmitTeams, ITeams } from "../../interfaces/teams-interfaces";
import ErrorMessage from "../../../../common/components/error-message";
import { baseUrl } from "../../../../api/authService/authService";

import "./AddTeamContainer.scss";

const { setCurrentTeam, setTeamId } = teamsSlice.actions;

export const AddTeamContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState("");
    const newImage = avatar ? baseUrl + avatar : "";

    const [addTeam, {data: addTeamData, error: addTeamError}] = teamsApiService.useAddTeamMutation();
    const [editTeam, {data: editData, error: editTeamError}] = teamsApiService.useEditTeamMutation();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { currentTeam } = useAppSelector(state => state.teamsReducer);
    const { name, foundationYear, division, conference, imageUrl, id }: ITeams = currentTeam;

    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues: {
        name: name || "",
        division: division || "",
        conference: conference || "",
        foundationYear: foundationYear || null,
        imageUrl: imageUrl || "",
    }});

    const submit: SubmitHandler<ISubmitTeams> = useCallback( async (introducedData) => {
        if (id) {
            await editTeam({...introducedData, imageUrl: newImage|| imageUrl, token, id});
        } else {
            await addTeam({...introducedData, imageUrl: newImage|| imageUrl, token});
        }
    }, [id]);

    const goHome = useCallback(() => {
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
    }, [dispatch, navigate]);

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
                    <AddImage imageUrl={imageUrl} avatar={avatar} setAvatar={setAvatar} />

                    <AddTeamForm register={register} handleSubmit={handleSubmit} errors={errors} submit={submit} />
                </div>
            </div>
        </div>
    );
};
