import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { teamsSlice } from "../../TeamsSlice";
import { ITeams } from "../../interfaces/ITeams";
import Types from "../../../../types";
import SearchField from "../../../../common/components/search-field";
import Item from "../../../../common/components/item";
import { getFilteredItems } from "../../selectors";

import "./teams-container.scss";

const { optionsItemsPerPage } = Types;

const TeamsContainer:FC = () => {
    const dispatch = useAppDispatch();
    const animatedComponents = makeAnimated();
    const filteredItems = useSelector(getFilteredItems);

    const { itemsPerPage, searchTeam } = useAppSelector(state => state.teamsReducer);
    const { setNumberItemsPerPage, setSearchTeam } = teamsSlice.actions;

    const [currentItems, setCurrentItems] = useState<Array<ITeams>>([]);
    const [pageCount, setPageCount] = useState(0);
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

    return (
        <div className="TeamsContainer">
            <SearchField value={searchTeam} onChange={(val) => dispatch(setSearchTeam(val))} className="teamSearch" />

            <div className="TeamsContainer__items">
                <Row gutter={[24, 24]}>
                    {currentItems?.map((item: {year?: string, name?: string, image?: string, id?: number}) => (
                        <Col span={6} className="TeamsContainer__item-wrapper" key={item.id}>
                            <Item year={item.year} name={item.name} image={item.image}/>
                        </Col>
                    ))}
                </Row>
            </div>

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