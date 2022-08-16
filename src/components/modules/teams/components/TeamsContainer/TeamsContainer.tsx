import React, { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { authorizationSlice } from "../../../authorization/AuthorizationSlice";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { teamsSlice } from "../../TeamsSlice";
import Types from "../../../../types";
import { TeamsItems } from "../TeamsItems/TeamsItems";
import SearchField from "../../../../common/components/search-field";
import CustomButton from "../../../../common/components/custom-button";
import EmptyItems from "../../../../common/components/empty-items";
import { useDebounce } from "../../../../common/hooks/debounce";

import "./TeamsContainer.scss";

const { optionsItemsPerPage } = Types;

const { setTokenError } = authorizationSlice.actions;
const { setTeams, setSearchTeam, setTeamId, setPagination } = teamsSlice.actions;

export const TeamsContainer:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teams, pagination, searchTeam } = useAppSelector(state => state.teamsReducer);
    const { itemsPerPage, pageCount, currentPage } = pagination;

    const debounced = useDebounce(searchTeam);

    const {
        data: teamsData,
        error: teamsError,
        isLoading: teamsIsLoading,
        refetch: teamsReFetch,
    } = teamsApiService.useGetTeamsQuery({token, page: currentPage, pageSize: itemsPerPage, name: debounced});

    const missingCount = teamsData && (teamsData.count <= 0) && !teamsError && !debounced.length;

    const getValueItemsPerPage = useCallback(() => {
        if (itemsPerPage) {
            return optionsItemsPerPage.find((c) => c.value === itemsPerPage);
        }
    }, [itemsPerPage]);

    const handleChange = useCallback((newValue: {label: string, value: number} ) => {
        dispatch(setPagination({ itemsPerPage: newValue.value, pageCount, currentPage}));
    }, []);

    const handlePageClick = (event: { selected: number }) => {
        dispatch(setPagination({ itemsPerPage, pageCount, currentPage: event.selected + 1}));
    };

    const setItemId = useCallback((id: number | null) => {
        dispatch(setTeamId(id));
        navigate(`team:${id}`);
    }, []);

    useEffect(() => {
        if (teamsData && !teamsError) {
            let countPages = Math.ceil(teamsData.count / teamsData.size);
            if (countPages <= 0) {
                countPages = 1;
            }

            dispatch(setTeams(teamsData.data));
            dispatch(setPagination({ itemsPerPage, pageCount: countPages, currentPage}));
        } else if (!teamsData && (teamsError)) {
            dispatch(setTokenError(teamsError));
        }
    }, [dispatch, teamsData, teamsError]);

    useEffect(() => {
        if (currentPage || itemsPerPage) {
            teamsReFetch();
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (!teams.length) {
            handlePageClick({selected: 0});
        }
    }, [teams]);

    return (
        <div className="TeamsContainer">
            <div className="fields-wrapper">
                { !missingCount ? (
                    <SearchField
                        value={searchTeam}
                        onChange={(val) => dispatch(setSearchTeam(val))}
                        className="teamSearch"/>
                ) : <div />}

                <CustomButton
                    type="button"
                    className="add-item"
                    onClick={() => navigate("addTeam")}
                >
                    Add +
                </CustomButton>
            </div>

            {!teams.length && teamsIsLoading && !teamsError ? <div>...Loading</div> : ""}
            {!teams.length && !teamsIsLoading && teamsError ? <div>error</div> : ""}
            {!teams.length && !teamsError && !teamsIsLoading  ? <EmptyItems isTeamsPage={true} namePage="teams" /> : ""}

            {teams.length && !teamsError && !teamsIsLoading ? <TeamsItems setItemId={setItemId}/> : ""}

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
                        forcePage={currentPage - 1}
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
