import React, {FC} from "react";
import {IPlayerItemProps} from "../../../interfaces/players-interfaces";
import fakeImage from "../../../../../assests/images/avatar.jpg";

import s from "../PlayersItems.module.scss";

export const Item:FC<IPlayerItemProps> = ({name, image, id, teamName, number, setItemId}) => (
    <div className={s.PlayerItem} onClick={() => setItemId(id)}>
        <div className={s.imageWrapper}>
            <img alt="teamImage" src={image || fakeImage}/>
        </div>
        <div className={s.descriptionWrapper}>
            <div className={s.nameWrapper}>
                <div className={s.playerName}>{name}</div>
                <div className={s.playerNumber}>{`#${number}`}</div>
            </div>

            <span className={s.teamName}>{teamName}</span>
        </div>
    </div>
);
