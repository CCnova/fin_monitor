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
