export interface IUniversity {
  name: string;
  city: string;
  popularity: string;
  students: number;
  budgetPlaces: boolean;
  tags: { id: number; name: string }[];
  image: string;
}
