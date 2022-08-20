import { ITeams, ITeamsSelectOptions } from "../teams/interfaces/teams-interfaces";

export const getAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();

    let m = today.getMonth() - birthDate.getMonth();
    const d = today.getDay() - birthDate.getDay();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if ( age === 0 ) {
        m = 12 + m;
        if (d < 0 || (d === 0 && today.getDate() < birthDate.getDate())) {
            m--;
        }
    }

    return age ? age : m;
};

export const getOptions = (arr: ITeams[]) => {
    if (arr) {
        return arr?.reduce<ITeamsSelectOptions[]>((acc: ITeamsSelectOptions[], item) => [...acc, {value: item.id, label: item.name}], []);
    } else return [];
};

export const getArrayTeamsId = (selectedArray: ITeamsSelectOptions[]) => {
    if (selectedArray.length) {
        return selectedArray?.map((i: ITeamsSelectOptions) => i.value);
    }
};