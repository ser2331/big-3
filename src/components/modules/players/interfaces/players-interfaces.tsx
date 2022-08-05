
export interface IPlayers {
    id: number | null;
    name: string;
    birthday: string;
    avatarUrl: string;
    height: number | null;
    weight: number | null;
    number: number | null;
    position: string;
    team: number | null;
}

export interface IResPlayers {
    count: number;
    page: number;
    data: IPlayers[];
    size: number;
}

export interface IGetPlayers {
    name?: string;
    teamIds?: number[];
    page: number;
    pageSize?: number;
    token: string;
}

export interface IGetPlayer {
    token: string;
    playerId: number | null;
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
export interface IAddPlayerFormValidation {
    name: string;
    number: number;
    position: {
        label: string;
        value: string;
    };
    team: {
        label: string;
        value: string;
    };
    birthday: string;
    height: number;
    weight: number;
    avatarUrl: string;
    id?: number;
    token: string;
}

export interface IDeletePlayer {
    token: string;
    id: number | null;
}

export interface IPlayersItems {
    setItemId: (id: number | null) =>  void;
}

export interface IPlayerItemProps {
    name: string;
    team: number | null;
    image?: string;
    id: number | null;
}

export interface ITeamOptions {
    label: string;
    value: string | number | null;
}
