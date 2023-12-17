export interface IUniversity {
  id: number;
  name: string;
  city: string;
  popularity: string;
  students: number;
  budgetPlaces: boolean;
  tags: { id: number; name: string }[];
  image: string;
}
