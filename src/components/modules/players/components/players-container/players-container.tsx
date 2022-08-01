import React, {FC, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import {useAppDispatch, useAppSelector} from "../../../../core/redux/redux";
import { playersSlice } from "../../PlayersSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactPaginate from "react-paginate";
import { IPlayers } from "../../interfaces/IPlayers";
import SearchField from "../../../../common/components/search-field";
import Item from "../../../../common/components/item";
import { getFilteredItems } from "../../selectors";

import "./players-container.scss";

const PlayersContainer:FC = () => {
    const dispatch = useAppDispatch();

    const { players, selectedPlayers, itemsPerPage, searchPlayerName } = useAppSelector(state => state.playersReducer);
    const { setSelectedPlayers, setSearchPlayerName } = playersSlice.actions;
    const filteredItems = useSelector(getFilteredItems);
    const animatedComponents = makeAnimated();

    const [currentItems, setCurrentItems] = useState<Array<IPlayers>>([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);

    const options = players?.reduce((acc: any, item: any) => [...acc, {value: item.id, label: item.name}], [],);


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
        if (searchPlayerName) {
            handlePageClick({selected: 0});
        }
    }, [searchPlayerName]);

    return (
        <div className="PlayersContainer">

            <div className="fields-wrapper">
                <SearchField value={searchPlayerName} onChange={(val) => dispatch(setSearchPlayerName(val))} classNameWrapper="playersSearch" />
                <Select
                    className="selector"
                    classNamePrefix="Multi-selector"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    value={selectedPlayers}
                    onChange={(e: any) => dispatch(setSelectedPlayers(e))}
                />
            </div>

            <div className="PlayersContainer__items">
                <Row gutter={[24, 24]}>
                    {currentItems?.map((item: {birthday?: string, name?: string, avatarUrl?: string, id?: number}) => (
                        <Col span={6} className="TeamsContainer__item-wrapper" key={item.id}>
                            <Item year={item.birthday} name={item.name} image={item.avatarUrl}/>
                        </Col>
                    ))}
                </Row>
            </div>

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
