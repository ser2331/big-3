
export interface ITeams {
    name: string;
    foundationYear: number | null;
    division: string;
    conference: string;
    imageUrl: string;
    id: number | null;
}

export interface IGetTeams {
    name?: string;
    page?: number;
    pageSize?: number;
    token: string;
}

export interface IResTeams {
    count: number;
    page: number;
    data: ITeams[];
    size: number;
}

export interface IAddTeam {
    token: string;
    name: string,
    foundationYear?: number | null;
    division?: string,
    conference?: string,
    imageUrl?: string,
    id?: number | null;
}

export interface IDeleteTeam {
    token: string;
    id: number | null;
}

export interface IGetTeam {
    token: string;
    teamId: number | null;
}

export interface ITeamItemProps {
    name: string;
    foundationYear?: number | null;
    image?: string;
    id: number | null;
}

export interface ITeamsItems {
    setItemId: (id: number | null) =>  void;
}

export interface ITeamsSelectOptions {
    label: string;
    value: number | null;
}