import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { IPlayers, ISubmitPlayer, ITeamOptions } from "../../interfaces/players-interfaces";
import { playersSlice } from "../../PlayersSlice";
import { teamsSlice } from "../../../teams/TeamsSlice";
import { imageSlice } from "../../../image/imageSlice";
import { playersApiService } from "../../../../api/players/playersApiService";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { baseUrl } from "../../../../api/authService/authService";
import { AddImage } from "../../../image/components/AddImage/AddImage";
import { AddPlayerForm } from "../AddPlayerForm/AddPlayerForm";
import ErrorMessage from "../../../../common/components/error-message";

import "./AddPlayerContainer.scss";

const { setCurrentPlayer, setPlayerId } = playersSlice.actions;
const { setTeams } = teamsSlice.actions;
const { setImage } = imageSlice.actions;

export const AddPlayerContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState("");
    const newImage = avatar ? baseUrl + avatar : "";

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teams } = useAppSelector(state => state.teamsReducer);
    const { currentPlayer } = useAppSelector(state => state.playersReducer);
    const { id, name, birthday, avatarUrl, height, weight, number, position, team }: IPlayers = currentPlayer;

    const [addPlayer, {data: addPlayerData, error: addPlayerError}] = playersApiService.useAddPlayerMutation();
    const [editPlayer, {data: editPlayerData, error: editPlayerError}] = playersApiService.useEditPlayerMutation();
    const { data: teamsData, error: teamsError } = teamsApiService.useGetTeamsQuery({token});
    const { data: positionsData, error: positionsError } = playersApiService.useGetPositionsQuery({token});

    const positionOptions = useMemo(() => {
        if (!positionsError && positionsData) {
            return positionsData.reduce((acc: ITeamOptions[], p: string) => [...acc, {label: p.replace(/([A-Z])/g, " $1").trim(), value: p}], []);
        }
    }, [positionsError, positionsData]);

    const defaultValuePosition = useMemo(() => {
        if (positionOptions?.length && position) {
            return positionOptions.find((i: ITeamOptions) => position === i.value);
        }
    }, [positionOptions, position]);

    const teamOptions = useMemo(() => {
        if (teams) {
            return teams.reduce<ITeamOptions[]>((acc: ITeamOptions[], t) => [...acc, {label: t.name, value: t.id}], []);
        } else return [{label: "", value: ""}];
    }, [teams]);

    const defaultValueTeams = useMemo(() => {
        if (teamOptions && team) {
            return teamOptions.find((i) => team === i.value);
        }
    }, [teamOptions, team]);

    const defaultValueBirthday = useMemo(() => {
        if (birthday) {
            return new Date(birthday).toISOString().slice(0, 10);
        } else new Date().toISOString().slice(0, 10);
    }, [birthday]);

    const {control, register, handleSubmit, formState: { errors }} = useForm<ISubmitPlayer>({defaultValues: {
        name: name || "",
        position: defaultValuePosition || "",
        team: defaultValueTeams || null,
        height: height || null,
        weight: weight || null,
        birthday: defaultValueBirthday || "",
        number: number || "",
        avatarUrl: avatarUrl || "",
    }});

    const submit: SubmitHandler<ISubmitPlayer> = async (introducedData) => {
        if (id) {
            await editPlayer({...introducedData, avatarUrl: newImage|| avatarUrl, token, id});
        } else {
            await addPlayer({...introducedData, avatarUrl: newImage|| avatarUrl, token});
        }
    };

    const goHome = () => {
        dispatch(setCurrentPlayer({
            id: null,
            name: "",
            birthday: "",
            avatarUrl: "",
            height: null,
            weight: null,
            number: null,
            position: "",
            team: null,
        }));
        dispatch(setPlayerId(null));
        dispatch(setImage(""));
        navigate("/players");
    };

    useEffect(() => {
        if ((addPlayerData && !addPlayerError) || (editPlayerData && !editPlayerError)) {
            goHome();
        }
    }, [addPlayerData, addPlayerError, editPlayerData, editPlayerError]);

    useEffect(() => {
        if (teamsData && !teamsError) {
            dispatch(setTeams(teamsData.data));
        }
    }, [teamsData, teamsError]);

    return (
        <div className="AddPlayerContainer">
            <div className="AddPlayerContainer__content-wrapper">
                <div className="AddTeamContainer__content-wrapper__header">
                    <span className="navigate-wrapper">
                        <div className="home-link" onClick={goHome}>Players </div> / Add new player
                    </span>

                    {addPlayerError || editPlayerData ? <ErrorMessage message="Чьл-ьл пошло не так..." /> : ""}
                </div>

                <div className="AddPlayerContainer__content-wrapper__content">
                    <AddImage imageUrl={avatarUrl} avatar={newImage} setAvatar={setAvatar} />

                    <AddPlayerForm
                        register={register}
                        submit={submit}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        control={control}
                        positionOptions={positionOptions}
                        teamOptions={teamOptions}
                    />
                </div>
            </div>
        </div>
    );
};
