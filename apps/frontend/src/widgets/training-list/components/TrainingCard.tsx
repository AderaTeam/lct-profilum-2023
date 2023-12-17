import { Flex, Image, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Button } from 'shared/components/Button';
import { Card } from 'shared/components/Card';

import hard from 'shared/assets/hard.svg';
import easy from 'shared/assets/easy.svg';
import medium from 'shared/assets/med.svg';

import style from './TrainingCard.module.scss';

interface TrainingCardProps {
  card: {
    title: string;
    tags: string[];
    points: number;
    questions: string;
    time: string;
    author: {
      name: string;
      image: string;
      role: string;
    };
    dif: string;
  };
}

export const TrainingCard = ({ card }: TrainingCardProps) => {
  const difImage: { [key: string]: string } = {
    'Низкая сложность': easy,
    'Cредняя сложность': medium,
    'Высокая сложность': hard,
  };

  return (
    <Card radius="32px">
      <Stack gap={24}>
        <h2 className="h2">{card.title}</h2>
        <Flex p={'6px 12px'} align={'center'} gap={12}>
          <p className="bold text pink">+ {card.points} Б.</p>
          <div className={style.circle}></div>
          <p className="text black">{card.questions}</p>
          <div className={style.circle}></div>
          <p className="text gray">{card.time}</p>
        </Flex>
        <Flex
          w={'fit-content'}
          gap={12}
          p={12}
          bg={'#F9F9F9'}
          style={{ borderRadius: '18px' }}
          align={'center'}
        >
          <Image w={30} src={difImage[card.dif]} />
          <p className="text black">{card.dif}</p>
        </Flex>
        <Flex gap={12}>
          {card.tags.map((item) => (
            <p className="text bold gray" key={item}>
              #{item}
            </p>
          ))}
        </Flex>
        <Flex justify={'space-between'}>
          <Flex
            style={{ borderLeft: '2px solid #DEE2E6', paddingLeft: '16px' }}
            align={'center'}
            gap={12}
          >
            <Image w={48} h={48} src={card.author.image} />
            <Stack gap={2}>
              <p className="text bold">{card.author.name}</p>
              <p className="text gray">{card.author.role}</p>
            </Stack>
          </Flex>
          <Button disabled outline>
            <Flex gap={8}>
              Продолжить
              <IconChevronRight stroke={1.5} color="#ADB5BD" />
            </Flex>
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
};
