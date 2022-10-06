import { User } from "@prisma/client";

export interface IFailResponseBody {
  error: Error;
  message: string;
}

export interface IListUsersResponseBody {
  users: User[];
}

export interface IGetUserRequestParams {
  id: string;
}

export interface IGetUserResponseBody {
  user: User | null;
}

export interface IPostUserRequestBody {
  email: string;
  name: string;
  password: string;
}

export interface IPostUserResponseBody {
  id: number;
}

export interface IPutUserRequestParams {
  id: string;
}

export interface IPutUserRequestBody {
  email?: string;
  name?: string;
  password?: string;
}

export interface IPutUserResponseBody {
  id: number;
}

export interface IDelUserRequestParams {
  id: string;
}

export interface IDelUserResponseBody {
  id: number;
}

export type UserFetcher = (id: number) => Promise<User | null>;
export type UserUpdater = (
  data: IPutUserRequestParams & IPutUserRequestBody
) => Promise<User>;
export type UserLister = () => Promise<User[]>;
export type UserCreator = (data: IPostUserRequestBody) => Promise<User>;
export type UserDeleter = (id: number) => Promise<User>;
