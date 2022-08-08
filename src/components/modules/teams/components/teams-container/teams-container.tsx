import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { teamsApiService } from "../../../../api/teams/teamsApiService";
import { teamsSlice } from "../../TeamsSlice";
import Types from "../../../../types";
import SearchField from "../../../../common/components/search-field";
import CustomButton from "../../../../common/components/custom-button";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";
import TeamsItems from "../teams-items";
import EmptyItems from "../../../../common/components/empty-items";

import "./teams-container.scss";

const { optionsItemsPerPage } = Types;

const TeamsContainer:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teams, itemsPerPage, pageCount, currentPage, searchTeam } = useAppSelector(state => state.teamsReducer);
    const { setNumberItemsPerPage, setTeams, setSearchTeam, setPageCount, setCurrentPage, setTeamId } = teamsSlice.actions;

    const {
        data: teamsData,
        error: teamsError,
        isLoading: teamsIsLoading,
        refetch: teamsReFetch,
    } = teamsApiService.useGetTeamsQuery({token, page: currentPage, pageSize: itemsPerPage, name: searchTeam});

    const animatedComponents = makeAnimated();

    const getValueItemsPerPage = () => {
        return itemsPerPage ? optionsItemsPerPage.find((c) => c.value === itemsPerPage) : "";
    };

    const handleChange = (newValue: {label: string, value: number} ) => {
        dispatch(setNumberItemsPerPage(newValue.value));
    };

    const handlePageClick = (event: { selected: number }) => {
        dispatch(setCurrentPage(event.selected + 1));
    };

    const setItemId = (id: number | null) => {
        dispatch(setTeamId(id));
        navigate(`team:${id}`);
    };

    useEffect(() => {
        if (teamsData && !teamsError) {
            let countPages = Math.ceil(teamsData.count / teamsData.size);
            if (countPages <= 0) {
                countPages = 1;
            }

            dispatch(setTeams(teamsData.data));
            dispatch(setPageCount(countPages));
        }
    }, [dispatch, teamsData, teamsError]);

    useEffect(() => {
        if (currentPage || itemsPerPage) {
            teamsReFetch();
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (searchTeam || !teams.length && currentPage !== 0) {
            handlePageClick({selected: 0});
        }
    }, [searchTeam, teams, currentPage]);

    return (
        <div className="TeamsContainer">
            <div className="fields-wrapper">
                <SearchField value={searchTeam} onChange={(val) => dispatch(setSearchTeam(val))} className="teamSearch" />

                <CustomButton
                    type={ButtonTypes.button}
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
        </div>   
    ); 
};

export default TeamsContainer;