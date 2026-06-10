export interface IIssues {
    title: string;
    description: string;
    type: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}