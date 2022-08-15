
export interface IForPlayers {
    height: number | null;
    weight: number | null;
    birthday: string;
    avatarUrl: string;
}

export interface IPlayers extends IForPlayers{
    id: number | null;
    name: string;
    position: string;
    team: number | null;
    number: number | null;
}

export interface ISubmitPlayer extends IForPlayers{
    name: string;
    position: {
        label: string;
        value: string;
    };
    team: ITeamOptions | null;
    number: string | number;
}

export interface IAddPlayer {
    name: string;
    number: number;
    position: string;
    team: number;
    birthday: string;
    height: number;
    weight: number;
    avatarUrl: string;
    id?: number;
    token: string;
}

export interface IResPlayers {
    count: number;
    page: number;
    data: IPlayers[];
    size: number;
}

export interface IGetPlayers {
    name?: string;
    teamIds?: (number | null | string)[];
    page?: number;
    pageSize?: number;
    token: string;
}

export interface IGetPlayer {
    token: string;
    playerId: number | null;
}

export interface IDeletePlayer {
    token: string;
    id: number;
}

export interface IAddPlayerFormValidation extends ISubmitPlayer {
    id?: number;
    token: string;
}

export interface IPlayersItems {
    setItemId: (id: number | null) =>  void;
}

export interface IPlayerItemProps {
    name: string;
    teamName?: string;
    image?: string;
    id: number | null;
    number: number | null;
}

export interface ITeamOptions {
    label: string;
    value: string | number | null;
}
