import { Stack } from '@mantine/core';

interface UniversityInfoProps {
  budgetPlaces: boolean;
  popularity: string;
  city: string;
  students: number;
}

export const UniversityInfo = ({
  budgetPlaces,
  popularity,
  city,
  students,
}: UniversityInfoProps) => {
  return (
    <Stack gap={16}>
      <Stack gap={8}>
        <p className="text gray">
          Город: <span className="text black">{city}</span>
        </p>
        <p className="text gray">
          Учащихся:
          <span className="text black"> {students} человек</span>
        </p>
        <p className="text gray">
          Бюджетные места:{' '}
          <span className="text black">{budgetPlaces ? 'Есть' : 'Нет'}</span>
        </p>
      </Stack>
      <p className="text black">
        Популярность:{' '}
        <span className={`text ${popularity === 'Средння' ? 'orange' : 'red'}`}>
          {popularity}
        </span>
      </p>
    </Stack>
  );
};
