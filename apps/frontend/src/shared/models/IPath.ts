export interface IPathStepContent {
  id: number;
  link?: string;
  questionsCount?: number;
  text?: string;
}
export interface IPathStep {
  id: number;
  step: number;
  title: string;
  points: number;
  tags: { id: number; name: string }[];
  content: IPathStepContent;
}

export interface IPath {
  id: number;
  name: string;
  pathSteps: IPathStep[];
  description: string;
  specialities: { name: string }[];
}
