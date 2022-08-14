export interface IUserData {
    name: string;
    avatarUrl: string;
    token: string;
}

export interface IGetToken {
    login: string;
    password: string;
}
export interface IGetTokenRegistration {
    name: string;
    login: string;
    password: string;
    confirmPassword: string;
}
