import React, {FC, useEffect, useState} from "react";
import { Col, Row } from "antd";
import ReactPaginate from "react-paginate";
import { useAppSelector } from "../../../../core/hooks/redux";
import { ITeams } from "../../interfaces/ITeams";
import SearchField from "../../../../common/components/search-field";
import Item from "../../../../common/components/item";

import "./teams-container.scss";

const TeamsContainer:FC = () => {
    const { teams } = useAppSelector(state => state.teamsReducer);

    const [searchName, setSearchName] = useState("");

    const [currentItems, setCurrentItems] = useState<Array<ITeams>>([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 6;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(teams.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(teams.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % teams.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="TeamsContainer">
            <SearchField value={searchName} onChange={setSearchName} className="teamSearch" />

            <Row gutter={[24, 24]}>
                {currentItems?.map((item: {year?: string, name?: string, image?: string, id?: number}) => (
                    <Col span={6} className="TeamsContainer__item-wrapper" key={item.id}>
                        <Item year={item.year} name={item.name} image={item.image}/>
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

export default TeamsContainer;