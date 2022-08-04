import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { playersSlice } from "../../PlayersSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactPaginate from "react-paginate";
import { playersApiService } from "../../../../api/players/playersApiService";
import { ISelectOption } from "../../interfaces/players-interfaces";
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
    const { players, selectedPlayers, itemsPerPage, searchPlayerName, pageCount, currentPage } = useAppSelector(state => state.playersReducer);
    const { setSearchPlayerName, setPlayerId, setCurrentPage, setPageCount, setPlayers } = playersSlice.actions;

    const { data: data, error, isLoading, refetch } = playersApiService.useGetPlayersQuery({token, page: currentPage, pageSize: itemsPerPage});

    const animatedComponents = makeAnimated();

    const options = players?.reduce((acc: Array<ISelectOption>, item: any) => [...acc, {value: item.id, label: item.name}], []);

    const handlePageClick = (event: { selected: number }) => {
        dispatch(setCurrentPage(event.selected + 1));
    };

    const setItemId = (id: number | null) => {
        dispatch(setPlayerId(id));
        navigate(`players:${id}`);
    };

    useEffect(() => {
        if (data && !error) {
            let countPages = Math.ceil(data.count / data.size);
            if (countPages <= 0) {
                countPages = 1;
            }

            dispatch(setPlayers(data.data));
            dispatch(setPageCount(countPages));
        }
    }, [data, error]);

    useEffect(() => {
        if ( currentPage || itemsPerPage) {
            refetch();
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (searchPlayerName || selectedPlayers.length > 0) {
            handlePageClick({selected: 0});
        }
    }, [searchPlayerName, selectedPlayers]);

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
                        value={selectedPlayers}
                        // onChange={(option: any) => dispatch(setSelectedPlayers(option))}
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

            {!players.length && isLoading && !error ? <div>...Loading</div> : ""}
            {!players.length && !isLoading && error ? <div>Error</div> : ""}
            {!players.length && !error && !isLoading  ? <EmptyItems isPlayersPage={true} namePage="players" /> : ""}

            {players.length && !error && !isLoading ? <PlayersItems setItemId={setItemId}/> : ""}

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
