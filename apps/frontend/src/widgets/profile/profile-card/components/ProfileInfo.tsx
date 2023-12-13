import { Stack, Flex, Text, Image } from '@mantine/core';
import { Tag } from 'shared/components/Tag';

import rank0 from 'shared/assets/ranks/0.png';
import rank1 from 'shared/assets/ranks/1.png';
import rank2 from 'shared/assets/ranks/2.png';
import rank3 from 'shared/assets/ranks/3.png';
import rank4 from 'shared/assets/ranks/4.png';

import style from '../ProfileCard.module.scss';
import { IUser } from 'shared/models/IUser';

export const ProfileInfo = (user: IUser) => {
  const rankImage: { [key: string]: string } = {
    Незнайка: rank0,
    'Маг-самоучка': rank1,
    'Первый шар': rank2,
    Волшебник: rank3,
    Оракул: rank4,
  };

  return (
    <Stack gap={32}>
      <Stack gap={6}>
        <Flex align={'center'} gap={12}>
          <Text className={style.name}>{user.username}</Text>
          <Tag variant="light">Топ {user.rating}</Tag>
        </Flex>
        <Flex align={'center'} gap={16}>
          <p className="text">{user.nickname}</p>
          <div className={style.circle}></div>
          <Flex align={'center'} gap={8}>
            <Text className={style.rank}>{user.rank}</Text>
            <Image
              radius={'50%'}
              h={24}
              w={24}
              src={rankImage[user.rank] || rank0}
            />
          </Flex>
          <div className={style.circle}></div>
          <p className="text bold">{user.grade}</p>
        </Flex>
      </Stack>
      {user.paths.length ? (
        <Flex gap={8}>
          {user.paths.map((item) => (
            <Tag key={item.id} variant="outline">
              {item.name}
            </Tag>
          ))}
        </Flex>
      ) : (
        <></>
      )}
    </Stack>
  );
};
