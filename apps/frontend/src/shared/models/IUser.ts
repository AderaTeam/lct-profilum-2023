import { IPath } from "./IPath";

export interface IUser {
  email: string;
  isAnalyzed: boolean;
  id: number;
  username: string;
  role: string;
  rank: string;
  rating: number;
  points: number;
  path: IPath[];
}
