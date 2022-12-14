import React, {useCallback, useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { teamsSlice } from "../../TeamsSlice";
import { AddTeamForm } from "../AddTeamForm/AddTeamForm";
import { AddImage } from "../../../image/components/AddImage/AddImage";
import { ISubmitTeams, ITeams } from "../../interfaces/teams-interfaces";
import { ErrorMessage } from "../../../../common/components/error-message/error-message";

import s from "./AddTeamContainer.module.scss";

const { resetTeamsInformation } = teamsSlice.actions;

export const AddTeamContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState("");

    const [addTeam, {data: addTeamData, error: addTeamError}] = teamsApiService.useAddTeamMutation();
    const [editTeam, {data: editData, error: editTeamError}] = teamsApiService.useEditTeamMutation();

    const { currentTeam } = useAppSelector(state => state.teamsReducer);
    const { name, foundationYear, division, conference, imageUrl, id }: ITeams = currentTeam;

    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues: {
        name: name || "",
        division: division || "",
        conference: conference || "",
        foundationYear: foundationYear || null,
        imageUrl: imageUrl || "",
    }});

    const submit: SubmitHandler<ISubmitTeams> = async (introducedData) => {
        if (id) {
            await editTeam({...introducedData, imageUrl: avatar || imageUrl, id});
        } else {
            await addTeam({...introducedData, imageUrl: avatar || imageUrl});
        }
    };

    const goHome = useCallback(() => {
        navigate("/teams");
    }, [navigate]);

    useEffect(() => {
        if ((addTeamData && !addTeamError) || (editData && !editTeamError)) {
            goHome();
        }
    }, [addTeamData, addTeamError, editData, editTeamError]);

    useEffect(() => {
        return () => {
            dispatch(resetTeamsInformation());
        };
    }, []);

    return (
        <div className={s.AddTeamContainer}>
            <div className={s.AddTeamContainer__contentWrapper}>
                <div className={s.AddTeamContainer__contentWrapper__header}>
                    {addTeamError || editTeamError ? <ErrorMessage message="??????-???? ?????????? ???? ??????..." /> : ""}

                    <span className={s.navigateWrapper}>
                        <div className={s.homeLink} onClick={goHome}>Teams </div> / Add new team
                    </span>
                </div>

                <div className={s.AddTeamContainer__contentWrapper__content}>
                    <AddImage imageUrl={imageUrl} avatar={avatar} setAvatar={setAvatar} />

                    <AddTeamForm register={register} handleSubmit={handleSubmit} errors={errors} submit={submit} cancel={goHome} />
                </div>
            </div>
        </div>
    );
};
