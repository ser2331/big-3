import React, { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { playersSlice } from "../../PlayersSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactPaginate from "react-paginate";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { teamsSlice } from "../../../teams/TeamsSlice";
import { playersApiService } from "../../../../api/players/playersApiService";
import { authorizationSlice } from "../../../authorization/AuthorizationSlice";
import { PlayersItems } from "../PlayersItems/PlayersItems";
import { SearchField } from "../../../../common/components/search-field/search-field";
import { CustomButton } from "../../../../common/components/custom-button/custom-button";
import { EmptyItems } from "../../../../common/components/empty-items/empty-items";
import Types from "../../../../types";
import { useDebounce } from "../../../../common/hooks/debounce";
import { getArrayTeamsId, getOptions } from "../../selectors";
import { ITeamsSelectOptions } from "../../../teams/interfaces/teams-interfaces";

import s from "./PlayersContainer.module.scss";

const { optionsItemsPerPage } = Types;

const { setTokenError } = authorizationSlice.actions;
const { setTeams } = teamsSlice.actions;
const { setSearchPlayerName, setPlayerId, setPagination, setSelectedTeam, resetPlayersInformation } = playersSlice.actions;

export const PlayersContainer:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

    const { teams } = useAppSelector(state => state.teamsReducer);
    const { selectedTeams, searchPlayerName, pagination } = useAppSelector(state => state.playersReducer);
    const { itemsPerPage, pageCount, currentPage } = pagination;

    const options = getOptions(teams);
    const selectedTeamsId = getArrayTeamsId(selectedTeams);
    const debounced = useDebounce(searchPlayerName);

    const {
        data: teamsData,
        error: teamsError,
        refetch: teamsReFetch
    } = teamsApiService.useGetTeamsQuery({});

    useEffect(() => {
        if (teamsData && !teamsError) {
            dispatch(setTeams(teamsData.data));
        }
    }, [dispatch, teamsData, teamsError]);

    useEffect(() => {
        dispatch(resetPlayersInformation());
    }, []);

    const {
        data: playersData,
        error: playersError,
        isLoading: playersIsLoading,
        refetch: playersReFetch
    } = playersApiService.useGetPlayersQuery({page: currentPage, pageSize: itemsPerPage, name: debounced, teamIds: selectedTeamsId});

    const missingCount = playersData && (playersData.count <= 0) && !playersError && !debounced.length && !selectedTeamsId?.length;

    const getValueItemsPerPage = useCallback(() => {
        return itemsPerPage ? optionsItemsPerPage.find((c) => c.value === itemsPerPage) : "";
    }, [itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
        dispatch(setPagination({ itemsPerPage, pageCount, currentPage: event.selected + 1}));
    };

    const handleChangeNumberPerPage = useCallback(({ value }: { label: string, value: number }) => {
        // eslint-disable-next-line no-debugger
        // debugger;
        dispatch(setPagination({ itemsPerPage: value, pageCount, currentPage}));
    }, [dispatch]);

    const handleChangeSelectedTeams = useCallback(( option: ITeamsSelectOptions[] ) => {
        dispatch(setSelectedTeam(option));
    }, [dispatch]);

    const setItemId = useCallback((id: number | null) => {
        dispatch(setPlayerId(id));
        navigate(`player:${id}`);
    }, [dispatch]);

    useEffect(() => {
        if (playersData && !playersError) {
            let countPages = Math.ceil(playersData.count / playersData.size);
            if (countPages <= 0) {
                countPages = 1;
            }

            dispatch(setPagination({ itemsPerPage, pageCount: countPages, currentPage}));
        } else if (!playersData && (playersError)) {
            dispatch(setTokenError(playersError));
        }
    }, [dispatch, playersData, playersError]);

    useEffect(() => {
        if ( currentPage || itemsPerPage) {
            playersReFetch();
            teamsReFetch();
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (!playersData?.data.length) {
            handlePageClick({selected: 0});
        }
    }, [playersData]);

    return (
        <div className={s.PlayersContainer}>
            <div className={s.fieldsWrapper}>
                {!missingCount && (
                    <div className={s.leftFields}>
                        <SearchField
                            value={searchPlayerName}
                            onChange={(val) => dispatch(setSearchPlayerName(val))}
                            classNameWrapper={s.playersSearch}
                        />

                        <Select
                            className={s.selector}
                            classNamePrefix="MultiSelector"
                            components={animatedComponents}
                            isMulti
                            options={options}
                            value={selectedTeams}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onChange={handleChangeSelectedTeams}
                        />
                    </div>
                )}
                <div className={s.rightFields}>
                    <CustomButton
                        type="button"
                        className={s.addItem}
                        onClick={() => navigate("addPlayer")}
                    >
                        Add +
                    </CustomButton>
                </div>
            </div>

            {!playersData?.data.length && playersIsLoading && !playersError ? <div>...Loading</div> : ""}
            {!playersData?.data.length && !playersIsLoading && playersError ? <div>Error</div> : ""}
            {!playersData?.data.length && !playersError && !playersIsLoading  ? <EmptyItems isPlayersPage={true} namePage="players" /> : ""}
            {playersData?.data.length && playersError && !playersIsLoading  ? <div> Что-то пошло не так...</div> : ""}

            {playersData?.data.length && !playersError && !playersIsLoading ? <PlayersItems setItemId={setItemId} players={playersData?.data} /> : ""}

            {!missingCount && (
                <div className={s.footerWrapper}>
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
                        forcePage={currentPage - 1}
                    />

                    <Select
                        value={getValueItemsPerPage()}
                        placeholder=""
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onChange={handleChangeNumberPerPage}
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
