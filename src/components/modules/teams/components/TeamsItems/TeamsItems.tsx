import React, { FC } from "react";
import { ITeams, ITeamsItems } from "../../interfaces/teams-interfaces";
import { Item } from "./TeamItem/TeamItem";

import s from "./TeamsItems.module.scss";

export const TeamsItems:FC<ITeamsItems> = ({ setItemId, teamsData } ) => {
    return (
        <div className={s.TeamsItems}>
            {teamsData.map((item: ITeams) => (
                <div className={s.TeamsItems__itemWrapper} key={item.id}>
                    <Item foundationYear={item.foundationYear} name={item.name} image={item.imageUrl} id={item.id} setItemId={setItemId}/>
                </div>
            ))}
        </div>
    );
};
