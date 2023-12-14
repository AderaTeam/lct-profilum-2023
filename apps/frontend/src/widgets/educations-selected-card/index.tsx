import { Flex, Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { EducationsCard } from './components/EducationsCard';

import img1 from 'shared/assets/university/1.png';
import img2 from 'shared/assets/university/2.png';
import img3 from 'shared/assets/university/3.png';

const CardsList = (dataLen: number) => {
  const cards = [];
  for (let i = 0; i < 3 - dataLen; i++) {
    cards.push(i);
  }
  return cards;
};

export const EducationsSelectedCard = () => {
  const data = [
    { name: 'Омский Государственный Технический Унвиерситет', image: img1 },
    { name: 'МГУ имени Ломоносова', image: img2 },
  ];

  return (
    <Card>
      <Stack gap={24}>
        <Stack w={600} gap={16}>
          <h2 className="h2">Мой университет мечты</h2>
          <p className="text">
            Выберите топ-3 университета или колледжа, чтобы Профилум мог помочь
            вам построить путь для поступления
          </p>
        </Stack>
        <Flex gap={8}>
          {data.map((item) => (
            <EducationsCard
              key={item.name}
              name={item.name}
              image={item.image}
            />
          ))}
          {CardsList(data.length).map((index) => (
            <EducationsCard key={index} />
          ))}
        </Flex>
      </Stack>
    </Card>
  );
};
