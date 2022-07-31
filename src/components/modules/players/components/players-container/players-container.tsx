import React, {FC, useEffect, useState} from "react";
import { Col, Row } from "antd";
import { useAppSelector } from "../../../../core/hooks/redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactPaginate from "react-paginate";
import { IPlayers } from "../../interfaces/IPlayers";
import SearchField from "../../../../common/components/search-field";
import Item from "../../../../common/components/item";

import "./players-container.scss";

const PlayersContainer:FC = () => {
    const { players } = useAppSelector(state => state.playersReducer);

    const [searchName, setSearchName] = useState("");

    const [currentItems, setCurrentItems] = useState<Array<IPlayers>>([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 6;

    const options = players?.reduce((acc: any, item: any): any => [...acc, {value: item.name, label: item.name}], [],);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(players.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(players.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % players.length;
        setItemOffset(newOffset);
    };

    const animatedComponents = makeAnimated();

    return (
        <div className="PlayersContainer">

            <div className="fields-wrapper">
                <SearchField value={searchName} onChange={setSearchName} classNameWrapper="playersSearch" />
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[options[4], options[5]]}
                    isMulti
                    options={options}
                />
            </div>

            <Row gutter={[24, 24]}>
                {currentItems?.map((item: {birthday?: string, name?: string, avatarUrl?: string, id?: number}) => (
                    <Col span={6} className="TeamsContainer__item-wrapper" key={item.id}>
                        <Item year={item.birthday} name={item.name} image={item.avatarUrl}/>
                    </Col>
                ))}
            </Row>

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
