import { Stack } from '@mantine/core';
import { TrainingCard } from './components/TrainingCard';

import mage from 'shared/assets/mage.png';

export const TrainingList = () => {
  const data = [
    {
      title: 'Оcновы программирования',
      tags: ['Python', 'Основы языка', 'Алгоритмы'],
      points: 10,
      questions: '20 заданий',
      time: 'Занимает ~10 минут',
      author: { name: 'Профилум', image: mage, role: 'Организатор' },
      dif: 'Низкая сложность',
    },
    {
      title: 'Верстка на HTML:продвинутая',
      tags: ['HTML', 'CSS', 'WEB'],
      points: 30,
      questions: '11 заданий',
      time: 'Занимает ~30 минут',
      author: { name: 'Профилум', image: mage, role: 'Организатор' },
      dif: 'Cредняя сложность',
    },
  ];

  return (
    <Stack gap={12}>
      {data.map((item) => (
        <TrainingCard key={item.title} card={item} />
      ))}
    </Stack>
  );
};
