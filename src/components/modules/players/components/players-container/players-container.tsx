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
import Types from "../../../../types";
import { useDebounce } from "../../../../common/hooks/debounce";

import "./players-container.scss";

const { optionsItemsPerPage } = Types;

const PlayersContainer:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teams } = useAppSelector(state => state.teamsReducer);
    const { players, selectedTeams, itemsPerPage, searchPlayerName, pageCount, currentPage } = useAppSelector(state => state.playersReducer);
    const { setTeams } = teamsSlice.actions;
    const { setSearchPlayerName, setPlayerId, setCurrentPage, setPageCount, setPlayers, setSelectedTeam, setNumberItemsPerPage } = playersSlice.actions;
    const options = teams?.reduce<ITeamsSelectOptions[]>((acc: ITeamsSelectOptions[], item) => [...acc, {value: item.id, label: item.name}], []);
    const arrTeamId = selectedTeams?.length ? selectedTeams?.map((i: ITeamsSelectOptions) => i.value) : undefined;

    const debounced = useDebounce(searchPlayerName);

    const {
        data: teamsData,
        error: teamsError,
        refetch: teamsReFetch
    } = teamsApiService.useGetTeamsQuery({token});

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
    } = playersApiService.useGetPlayersQuery({token, page: currentPage, pageSize: itemsPerPage, name: debounced, teamIds: arrTeamId});

    const missingCount = playersData && (playersData.count <= 0) && !playersError && !debounced.length && !arrTeamId?.length;

    const getValueItemsPerPage = () => {
        return itemsPerPage ? optionsItemsPerPage.find((c) => c.value === itemsPerPage) : "";
    };

    const handlePageClick = (event: { selected: number }) => {
        dispatch(setCurrentPage(event.selected + 1));
    };

    const handleChange = (newValue: {label: string, value: number} ) => {
        dispatch(setNumberItemsPerPage(newValue.value));
    };

    const setItemId = (id: number | null) => {
        dispatch(setPlayerId(id));
        navigate(`players:${id}`);
    };

    useEffect(() => {
        if (playersData && !playersError) {
            let countPages = Math.ceil(playersData.count / playersData.size);
            if (countPages <= 0) {
                countPages = 1;
            }

            dispatch(setPlayers(playersData.data));
            dispatch(setPageCount(countPages));
        }
    }, [dispatch, playersData, playersError]);

    useEffect(() => {
        if ( currentPage || itemsPerPage) {
            playersReFetch();
            teamsReFetch();
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (searchPlayerName || selectedTeams && (selectedTeams.length > 0) || !players.length) {
            handlePageClick({selected: 0});
        }
    }, [searchPlayerName, selectedTeams, players]);

    return (
        <div className="PlayersContainer">

            {!missingCount && (<div className="fields-wrapper">
                <div className="left-fields">
                    <SearchField
                        value={searchPlayerName}
                        onChange={(val) => dispatch(setSearchPlayerName(val))}
                        classNameWrapper="playersSearch"
                    />

                    <Select
                        className="selector"
                        classNamePrefix="Multi-selector"
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
            </div>)}

            {!players.length && playersIsLoading && !playersError ? <div>...Loading</div> : ""}
            {!players.length && !playersIsLoading && playersError ? <div>Error</div> : ""}
            {!players.length && !playersError && !playersIsLoading  ? <EmptyItems isPlayersPage={true} namePage="players" /> : ""}
            {players.length && playersError && !playersIsLoading  ? <div> Что-то пошло не так...</div> : ""}

            {players.length && !playersError && !playersIsLoading ? <PlayersItems setItemId={setItemId} /> : ""}

            {!missingCount && (
                <div className="TeamsContainer__footer-wrapper">
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

                    <Select
                        value={getValueItemsPerPage()}
                        placeholder=""
                        onChange={(newValue: any) => handleChange(newValue)}
                        classNamePrefix="SelectorItemsPerPage"
                        components={animatedComponents}
                        defaultValue={[optionsItemsPerPage[1]]}
                        options={optionsItemsPerPage}
                    />
                </div>
            )}
        </div>   
    );
};

export default PlayersContainer;
