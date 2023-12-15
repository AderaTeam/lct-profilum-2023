import { Loader, Stack } from '@mantine/core';
import { Avatar } from 'shared/components/Avatar';
import { Card } from 'shared/components/Card';
import { useContext } from 'react';
import { Context } from 'main';

import mage from 'shared/assets/mage.png';
import rank from 'shared/assets/ranks/0.png';

interface ChatBlockProps {
  step: number;
  isLoading: boolean;
}

export const ChatBlock = ({ step, isLoading }: ChatBlockProps) => {
  const { UStore } = useContext(Context);

  const chatData = [
    {
      user: 'Хочу знать, что я могу делать в этом сервисе!',
      mage: (
        <Stack gap={16}>
          <p className="text black">В сервисе Профилум ты можешь:</p>
          <Stack gap={8}>
            <p className="text black">
              1. Подключить соц. сети и получить предсказание своей идеальной
              професии
            </p>
            <p className="text black">
              2. Выбрать топ-3 университетов или колледжей
            </p>
            <p className="text black">
              3. Посмотреть путь для погружения в профессию и поступления в
              учебное заведение
            </p>
          </Stack>
          <p className="text bold">Хочешь узнать о нашем сообществе?</p>
        </Stack>
      ),
    },
    {
      user: 'Расскажи, что такое сообщество и что я могу там делать?',
      mage: (
        <Stack gap={16}>
          <p className="text black">
            В Сообществах ты можешь видеть активность пользователей, смотреть,
            какого уровня уже достигли твои сверстники. <br /> А если у тебя
            есть соревновательных дух, то можешь попытаться{' '}
            <span className="text pink">обогнать рейтинг пользователей</span>{' '}
            топ-10!
          </p>
          <p className="text bold">Хочешь узнать о тренажере?</p>
        </Stack>
      ),
    },
    {
      user: 'Что такое тренажер? И что я могу там делать?',
      mage: (
        <Stack gap={16}>
          <p className="text black">
            В Тренажере ты можешь делать упражнения для закрепления полученных
            навыков и получать за это баллы в рейтинг.
          </p>
          <p className="text black">
            А еще ты можешь проходить челленеджи от компаний-партнеров и
            получать шанс попасть на практику!
          </p>
          <h3 className="h3 text pink">Давай начнем твой путь!</h3>
        </Stack>
      ),
    },
  ];

  if (step === 1) {
    return (
      <Card bg="#F8F9FA">
        <Stack gap={16}>
          <Avatar image={mage} name="Профилум" />
          <p className="text black">
            Привет! Я волшебник - оракул{' '}
            <span className="text pink">Профилум</span>. Я специализруюсь на
            предсказании будущей профессии. А еще я могу построить твой путь
            достижения цели :) <br /> Рады видеть тебя на пути к выбору професии
            твоей мечты
          </p>
          <p className="text bold">Хочешь узнать больше о сервисе?</p>
        </Stack>
      </Card>
    );
  }

  return (
    <Stack gap={12}>
      <Stack align="flex-end">
        <Card w={'fit-content'} bg="#F8F9FA" radius="32px" p="24px 32px">
          <Stack gap={16}>
            <Avatar
              name={UStore.user.username}
              image={UStore.user.image || UStore.user.avataruri || rank}
            />
            <p className="text black">{chatData[step - 2].user}</p>
          </Stack>
        </Card>
      </Stack>
      {isLoading ? (
        <>
          <Loader size={'xl'} color="gray" type="dots" />
        </>
      ) : (
        <>
          <Card bg="#F8F9FA">
            <Stack gap={16}>
              <Avatar image={mage} name="Профилум" />
              {chatData[step - 2].mage}
            </Stack>
          </Card>
        </>
      )}
    </Stack>
  );
};
