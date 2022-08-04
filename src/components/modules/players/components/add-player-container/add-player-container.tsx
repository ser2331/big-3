import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../../core/redux/redux";
import {IAddPlayerFormValidation, IPlayers, ITeamOptions} from "../../interfaces/players-interfaces";
import {playersSlice} from "../../PlayersSlice";
import {teamsSlice} from "../../../teams/TeamsSlice";
import {playersApiService} from "../../../../api/players/playersApiService";
import {teamsApiService} from "../../../../api/teams/teamsApiService";
import Field from "../../../../common/components/field";
import AddItemImg from "../../../../assests/images/addItemImg.svg";
import CustomButton from "../../../../common/components/custom-button";
import {ButtonTypes} from "../../../../common/components/custom-button/custom-button";
import SelectField from "../../../../common/components/select-field";
import {FieldTypes} from "../../../../common/components/field/field";

import "./add-player-container.scss";

const AddPlayerContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showImageField, setShowImageField] = useState(false);

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teams, currentPage, itemsPerPage } = useAppSelector(state => state.teamsReducer);
    const { currentPlayer } = useAppSelector(state => state.playersReducer);
    const { setTeams } = teamsSlice.actions;
    const { id, name, birthday, avatarUrl, height, weight, number, position, team }: IPlayers = currentPlayer;
    const { setCurrentPlayer, setPlayerId } = playersSlice.actions;

    const [addPlayer, {data, isError}] = playersApiService.useAddPlayerMutation();
    const [editPlayer, {data: editData, error, isLoading: loading}] = playersApiService.useEditPlayerMutation();
    const { data: teamsData, error: teamsError } = teamsApiService.useGetTeamsQuery({token, page: currentPage, pageSize: itemsPerPage});

    const positionOptions = [
        {label: "Center Forward", value: "Center Forward"},
        {label: "Guard Forward", value: "Guard Forward"},
        {label: "Forward", value: "Forward"},
        {label: "Center", value: "Center"},
        {label: "Guard", value: "Guard"},
    ];
    const defaultValuePosition = positionOptions.find((i) => position === i.value);

    const teamOptions = teams?.reduce<ITeamOptions[]>((acc: ITeamOptions[], team) => [...acc, {label: team.name, value: team.id}], []);
    const defaultValueTeams = teamOptions.find((i) => team === i.value);
    const defaultValueBirthday = new Date(birthday).toISOString().slice(0, 10);

    const {control, register, handleSubmit, getValues, formState: { errors }} = useForm({defaultValues: {
        name: name || "",
        position: defaultValuePosition || "",
        team: defaultValueTeams || null,
        height: height || null,
        weight: weight || null,
        birthday: defaultValueBirthday || "",
        number: number || "",
        avatarUrl: avatarUrl || "",
    }});

    const submit = async (introducedData: IAddPlayerFormValidation) => {
        if (id) {
            await editPlayer({...introducedData, token, id});
        } else {
            await addPlayer({...introducedData, token});
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
        navigate("/players");
    };

    useEffect(() => {
        if ((data && !isError) || (editData && !error)) {
            navigate("/players");
        }
    }, [data, isError, editData, error]);

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
                </div>

                <div className="AddPlayerContainer__content-wrapper__content">
                    <div className="image">
                        <div className="image-wrapper" >
                            <img
                                alt="addItem"
                                className="add-item"
                                src={AddItemImg}
                                onClick={() => setShowImageField(!showImageField)}
                            />

                            {getValues().avatarUrl ? <img className="new-image" alt="addItem" src={getValues().avatarUrl} /> : ""}
                        </div>

                        {showImageField ? (
                            <div className="image-url-wrapper">
                                <Field style="image-url" registerName="avatarUrl" register={register} />
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
                                property={{required: "Enter player name"}}
                            />
                            <SelectField
                                label="Position"
                                name="position"
                                options={positionOptions}
                                control={control}
                                error={errors.position}
                            />
                            <SelectField
                                label="Team"
                                name="team"
                                options={teamOptions}
                                control={control}
                                error={errors.team}
                            />
                            <div className="fields-line">
                                <Field
                                    label="Height (cm)"
                                    register={register}
                                    registerName="height"
                                    error={errors.height}
                                    property={{required: "Enter height"}}
                                />
                                <Field
                                    label="Weight (kg)"
                                    register={register}
                                    registerName="weight"
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
                                    type={FieldTypes.date}
                                    property={{required: "Enter birthday"}}
                                />
                                <Field
                                    label="Number"
                                    register={register}
                                    registerName="number"
                                    error={errors.number}
                                    property={{required: "Enter player number"}}
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