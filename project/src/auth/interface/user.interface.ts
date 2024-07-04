import { Interface } from "readline";

export enum Role{
    Admin = 'admin',
    Customer= 'customer'
};

type User ={
    id: number,
    username: string;
    password: string;
    Role: string;
};

export interface IAuthenticate{
    readonly user: User;
    readonly token : string;
}