import { Stack } from '@mantine/core';
import img1 from 'shared/assets/university/1.png';
import img2 from 'shared/assets/university/2.png';
import { UniversityCard } from './components/UniversityCard';
import { IUniversity } from 'shared/models/IUniversity';
import { ResultCard } from 'shared/components/ResultCard';

export const EducationsUniversity = () => {
  const data: IUniversity[] = [
    {
      name: 'Омский Государственный Технический Университет',
      city: 'Омск',
      popularity: 'Средняя',
      students: 5000,
      budgetPlaces: true,
      tags: ['ТОП 20', 'ПОДХОДИТ ПОД ВАШ ПУТЬ', 'МИН БАЛЛ - 200'],
      image: img1,
    },
    {
      name: 'МГУ имени Ломоносова',
      city: 'Омск',
      popularity: 'Высокая',
      students: 5000,
      budgetPlaces: true,
      tags: ['ТОП 20', 'ПОДХОДИТ ПОД ВАШ ПУТЬ', 'МИН БАЛЛ - 200'],
      image: img2,
    },
  ];

  return (
    <Stack gap={48}>
      <p>123</p>
      <Stack gap={12}>
        {data.map((item) => (
          <UniversityCard university={item} key={item.name} />
        ))}
      </Stack>
    </Stack>
  );
};
