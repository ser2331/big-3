import React, { FC } from "react";
import { ITeamItemProps, ITeams, ITeamsItems } from "../../interfaces/teams-interfaces";
import fakeImage from "../../../../assests/images/teamLogo.jpeg";

import s from "./TeamsItems.module.scss";

export const TeamsItems:FC<ITeamsItems> = ({ setItemId, teamsData } ) => {

    const Item:FC<ITeamItemProps> = ({name, foundationYear, image, id}) =>  (
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

    return (
        <div className={s.TeamsItems}>
            {teamsData.map((item: ITeams) => (
                <div className={s.TeamsItems__itemWrapper} key={item.id}>
                    <Item foundationYear={item.foundationYear} name={item.name} image={item.imageUrl} id={item.id} />
                </div>
            ))}
        </div>
    );
};
