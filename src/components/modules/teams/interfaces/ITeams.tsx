export interface ITeams {
    name: string;
    foundationYear: number;
    division: string;
    conference: string;
    imageUrl: string;
    id: number;
}

export interface IGetTeams {
    name?: string;
    page: number;
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
    foundationYear: string,
    division?: string,
    conference?: string,
    imageUrl?: string,
    id?: number
}

export interface IDeleteTeam {
    token: string;
    id: number
}

export interface IGetTeam {
    token: string;
    teamId: number | null;
}

export interface ITeamItemProps {
    name: string;
    year?: string;
    image?: string;
    id: number;
}