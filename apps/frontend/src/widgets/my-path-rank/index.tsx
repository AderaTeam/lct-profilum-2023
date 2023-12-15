import { Avatar, Flex, Progress, Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';

import rank0 from 'shared/assets/ranks/0.png';
import rank1 from 'shared/assets/ranks/1.png';
import rank2 from 'shared/assets/ranks/2.png';
import rank3 from 'shared/assets/ranks/3.png';
import rank4 from 'shared/assets/ranks/4.png';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from 'main';

export const MyPathRank = observer(() => {
  const { UStore } = useContext(Context);

  const rankImage: { [key: string]: string } = {
    Незнайка: rank0,
    'Маг-самоучка': rank1,
    'Первый шар': rank2,
    Волшебник: rank3,
    Оракул: rank4,
  };

  const rankLevel: { [key: string]: number } = {
    Незнайка: 1,
    'Маг-самоучка': 2,
    'Первый шар': 3,
    Волшебник: 4,
    Оракул: 5,
  };

  return (
    <Card>
      <Stack gap={24}>
        <Stack w={600} gap={16}>
          <h2 className="h2">Мой прогресс</h2>
          <p className="text black">
            Получайте баллы за выполнение этапов , а также дополнительные баллы
            за прохождение упражнений в разделе “Тренажер”
          </p>
        </Stack>
        <Flex
          style={{ borderRadius: '8px' }}
          h={94}
          bg={'gray.0'}
          align={'center'}
          gap={16}
        >
          <div
            style={{
              borderRadius: '12px',
              background: '#ADB5BD',
              width: '12px',
              height: '94px',
            }}
            className="block"
          ></div>
          <Avatar size={80} src={rankImage[UStore.user.rank]} />
          <Stack gap={8}>
            <p className="text gray">Уровень {rankLevel[UStore.user.rank]}</p>
            <h3 className="h3">{UStore.user.rank}</h3>
          </Stack>
        </Flex>
        <Stack gap={12}>
          <Flex justify={'space-between'}>
            <h3 className="h3">{UStore.user.points} б.</h3>
            <h3 className="h3 text gray">{UStore.user.points} б.</h3>
          </Flex>
          <Progress
            h={12}
            radius={6}
            color="myColor"
            value={UStore.user.points}
          />
        </Stack>
      </Stack>
    </Card>
  );
});
