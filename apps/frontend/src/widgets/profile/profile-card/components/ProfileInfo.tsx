import { Stack, Flex, Text, Image } from '@mantine/core';
import { Tag } from 'shared/components/Tag';

import style from '../ProfileCard.module.scss';
import { IUser } from 'shared/models/IUser';

interface ProfileInfoProps {
  user: IUser;
  rankImage: { [key: string]: string };
}

export const ProfileInfo = ({ user, rankImage }: ProfileInfoProps) => {
  return (
    <Stack gap={32}>
      <Stack gap={6}>
        <Flex align={'center'} gap={12}>
          <Text className={style.name}>{user.username}</Text>
          {user.ratingPlacement ? (
            <Tag variant="light">Топ {user.ratingPlacement}</Tag>
          ) : (
            <></>
          )}
        </Flex>
        <Flex align={'center'} gap={16}>
          <p className="text">{user.nickname}</p>
          <div className={style.circle}></div>
          <Flex align={'center'} gap={8}>
            <Text className={style.rank}>{user.rank}</Text>
            <Image radius={'50%'} h={24} w={24} src={rankImage[user.rank]} />
          </Flex>
          {user.grade ? (
            <>
              <div className={style.circle}></div>
              <p className="text bold">{user.grade}</p>
            </>
          ) : (
            <></>
          )}
        </Flex>
      </Stack>
      {user?.paths.length ? (
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
