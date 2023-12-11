export interface IPathStepContent {
  link?: string;
  questionsCount?: number;
  text?: string;
}

export interface IPathStep {
  step: number;
  title: string;
  status: "Завершено" | "В процессе" | "Не начато";
  points: number;
  tags: string[];
  content: IPathStepContent;
}

export interface IPath {
  id: number;
  name: string;
  steps: IPathStep[];
}
