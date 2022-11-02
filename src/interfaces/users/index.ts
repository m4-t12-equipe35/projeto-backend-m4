export interface IUserRequest {
  name: string;
  email: string;
  stack: string;
  password: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  stack: string;
  password?: string | undefined;
  isAdm: boolean;
  isActive: boolean;
  score: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  stack?: string;
  password?: string;
}
