import { IAnalazedResult } from './IAnalazedResult';
import { IPath } from './IPath';

export interface IUser {
  email: string;
  isAnalyzed: boolean;
  id: number;
  username: string;
  role: string;
  rank: string;
  ratingPlacement: number;
  points: number;
  paths: IAnalazedResult[];
  grade?: string;
  nickname?: string;
  analysedPaths?: IPath[];
  image?: string;
  avataruri?: string;
}
