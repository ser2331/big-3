import React, {FC} from "react";
import fakeImage from "../../../assests/images/fakeImage.png";

import "./item.scss";

interface ItemProps {
    name?: string,
    year?: string,
    image?: string
}

const Item:FC<ItemProps> = ({name, year, image}) => (
    <div className="Item">
        <div className="image-wrapper">
            <img alt="teamImage" src={image || fakeImage}/>
        </div>
        <div className="description-wrapper">
            <span className="team-name">{name}</span>
            <span className="team-year">{`Year of foundation: ${year}`}</span>
        </div>
    </div>
);

export default Item;