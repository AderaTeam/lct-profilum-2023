import { IPath } from './IPath';
import { IUser } from './IUser';
export interface IEvents {
  id: number;
  title: string;
  author: IUser;
  path: IPath;
  status: string;
  date: string;
}
