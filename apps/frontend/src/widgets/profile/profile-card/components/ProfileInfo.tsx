import { Stack, Flex, Text, Image } from '@mantine/core';
import { Tag } from 'shared/components/Tag';

import rank from 'shared/assets/rank.svg';

import style from '../ProfileCard.module.scss';
import { IUser } from 'shared/models/IUser';

export const ProfileInfo = (user: IUser) => {
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
            <Image h={24} w={24} src={rank} />
          </Flex>
          <div className={style.circle}></div>
          <p className="text bold">{user.grade}</p>
        </Flex>
      </Stack>
      {user.path.length ? (
        <Flex gap={8}>
          {user.path.map((item) => (
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
