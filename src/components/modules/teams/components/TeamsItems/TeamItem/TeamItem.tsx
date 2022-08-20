import React, { FC } from "react";
import fakeImage from "../../../../../assests/images/teamLogo.jpeg";
import { ITeamItemProps } from "../../../interfaces/teams-interfaces";

import s from "../TeamsItems.module.scss";

export const Item:FC<ITeamItemProps> = ({name, foundationYear, image, id, setItemId}) =>  (
    <div className={s.TeamItem} onClick={() => setItemId(id)}>
        <div className={s.imageWrapper}>
            <img alt="teamImage" src={image || fakeImage}/>
        </div>
        <div className={s.descriptionWrapper}>
            <span className={s.teamName}>{name}</span>
            <span className={s.teamYear}>{`Year of foundation: ${foundationYear}`}</span>
        </div>
    </div>
);
