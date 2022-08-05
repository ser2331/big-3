import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { playersSlice } from "../../PlayersSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactPaginate from "react-paginate";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { teamsSlice } from "../../../teams/TeamsSlice";
import { playersApiService } from "../../../../api/players/playersApiService";
import { ITeamsSelectOptions } from "../../../teams/interfaces/teams-interfaces";
import SearchField from "../../../../common/components/search-field";
import CustomButton from "../../../../common/components/custom-button";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";
import PlayersItems from "../players-items";
import EmptyItems from "../../../../common/components/empty-items";

import "./players-container.scss";


const PlayersContainer:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teams } = useAppSelector(state => state.teamsReducer);
    const { players, selectedTeams, itemsPerPage, searchPlayerName, pageCount, currentPage } = useAppSelector(state => state.playersReducer);
    const { setTeams } = teamsSlice.actions;
    const { setSearchPlayerName, setPlayerId, setCurrentPage, setPageCount, setPlayers, setSelectedTeam } = playersSlice.actions;
    const options = teams?.reduce((acc: Array<ITeamsSelectOptions>, item: any) => [...acc, {value: item.id, label: item.name}], []);
    const arrTeamId = selectedTeams?.length ? selectedTeams?.map((i: ITeamsSelectOptions) => i.value) : undefined;

    const {
        data: teamsData,
        error: teamsError,
    } = teamsApiService.useGetTeamsQuery({token, page: currentPage, pageSize: itemsPerPage});

    useEffect(() => {
        if (teamsData && !teamsError) {
            dispatch(setTeams(teamsData.data));
        }
    }, [dispatch, teamsData, teamsError]);

    const {
        data: playersData,
        error: playersError,
        isLoading: playersIsLoading,
        refetch: playersReFetch
    } = playersApiService.useGetPlayersQuery({token, page: currentPage, pageSize: itemsPerPage, name: searchPlayerName, teamIds: arrTeamId});

    const animatedComponents = makeAnimated();

    const handlePageClick = (event: { selected: number }) => {
        dispatch(setCurrentPage(event.selected + 1));
    };

    const setItemId = (id: number | null) => {
        dispatch(setPlayerId(id));
        navigate(`players:${id}`);
    };

    useEffect(() => {
        if (playersData && !playersError && teams) {
            let countPages = Math.ceil(playersData.count / playersData.size);
            if (countPages <= 0) {
                countPages = 1;
            }

            dispatch(setPlayers(playersData.data));
            dispatch(setPageCount(countPages));
        }
    }, [dispatch, playersData, playersError, teams]);

    useEffect(() => {
        if ( currentPage || itemsPerPage) {
            playersReFetch();
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (searchPlayerName || selectedTeams && (selectedTeams.length > 0)) {
            handlePageClick({selected: 0});
        }
    }, [searchPlayerName, selectedTeams]);

    return (
        <div className="PlayersContainer">

            <div className="fields-wrapper">
                <div className="left-fields">
                    <SearchField value={searchPlayerName} onChange={(val) => dispatch(setSearchPlayerName(val))} classNameWrapper="playersSearch" />

                    <Select
                        className="selector"
                        classNamePrefix="Multi-selector"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={options}
                        value={selectedTeams}
                        onChange={(option: any) => dispatch(setSelectedTeam(option))}
                    />
                </div>

                <div className="right-fields">
                    <CustomButton
                        type={ButtonTypes.button}
                        className="add-item"
                        onClick={() => navigate("addPlayer")}
                    >
                        Add +
                    </CustomButton>
                </div>
            </div>

            {!players.length && playersIsLoading && !playersError ? <div>...Loading</div> : ""}
            {!players.length && !playersIsLoading && playersError ? <div>Error</div> : ""}
            {!players.length && !playersError && !playersIsLoading  ? <EmptyItems isPlayersPage={true} namePage="players" /> : ""}
            {players.length && playersError && !playersIsLoading  ? <div> Что-то пошло не так...</div> : ""}

            {players.length && !playersError && !playersIsLoading ? <PlayersItems setItemId={setItemId}/> : ""}

            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="Pagination"
                activeClassName="active"
                renderOnZeroPageCount={undefined}
            />
        </div>   
    );
};

export default PlayersContainer;
