import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { apiService } from "../../../../api/apiService";
import { teamsSlice } from "../../TeamsSlice";
import { ITeams } from "../../interfaces/ITeams";
import Types from "../../../../types";
import SearchField from "../../../../common/components/search-field";
import Item from "../../../../common/components/item";
import CustomButton from "../../../../common/components/custom-button";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";
import { getFilteredItems } from "../../selectors";

import "./teams-container.scss";

const { optionsItemsPerPage } = Types;

const TeamsContainer:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useAppSelector(state => state.authorizationReducer);
    const { teams, itemsPerPage, pageCount, searchTeam } = useAppSelector(state => state.teamsReducer);
    const { data: data, error, isLoading, refetch } = apiService.useGetTeamsQuery({token, page: pageCount, pageSize: itemsPerPage});
    const { setNumberItemsPerPage, setTeams, setSearchTeam, setTeamId, setPageCount } = teamsSlice.actions;

    useEffect(() => {
        if (data && !error) {
            dispatch(setTeams(data.data));
        }
    }, [data, error]);

    useEffect(() => {
        if (pageCount && itemsPerPage) {
            refetch();
        }
    }, [pageCount, itemsPerPage]);

    const animatedComponents = makeAnimated();
    const filteredItems = useSelector(getFilteredItems);

    const [currentItems, setCurrentItems] = useState<Array<ITeams>>([]);
    const [itemOffset, setItemOffset] = useState(0);
    
    const getValueItemsPerPage = () => {
        return itemsPerPage ? optionsItemsPerPage.find((c) => c.value === itemsPerPage) : "";
    };

    const handleChange = (newValue: any ) => {
        dispatch(setNumberItemsPerPage(newValue.value));
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredItems]);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        if (searchTeam) {
            handlePageClick({selected: 0});
        }
    }, [searchTeam]);

    const setItemId = (id: number) => {
        dispatch(setTeamId(id));
        navigate(`team:${id}`);
    };

    const renderItems = () => (
        <div className="TeamsContainer__items">
            <Row gutter={[24, 24]}>
                {currentItems?.map((item: {year?: string, name?: string, image?: string, id?: number}) => (
                    <Col span={6} className="TeamsContainer__item-wrapper" key={item.id}>
                        <Item year={item.year} name={item.name} image={item.image} id={item.id} setItemId={setItemId}/>
                    </Col>
                ))}
            </Row>
        </div>
    );

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

            {!teams.length && isLoading && !error ? <div>...Loading</div> : ""}
            {!teams.length && !isLoading && error ? <div>error</div> : ""}
            {!teams.length && !error && !isLoading  ? <div>empty data</div> : ""}

            {teams.length && !error && !isLoading ? renderItems() : ""}

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
                    onChange={handleChange}
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