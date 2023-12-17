import { Stack } from '@mantine/core';
import { TrainingCard } from './components/TrainingCard';

import mage from 'shared/assets/mage.png';

export const TrainingList = () => {
  const data = [
    {
      title: 'Оcновы программирования',
      tags: ['Python', 'Основы языка', 'Алгоритмы'],
      points: 20,
      questions: '20 заданий',
      time: 'Занимает ~10 минут',
      author: { name: 'Профилум', image: mage, role: 'Организатор' },
      dif: 'Низкая сложность',
    },
  ];

  return (
    <Stack gap={12}>
      {data.map((item) => (
        <TrainingCard card={item} />
      ))}
    </Stack>
  );
};
