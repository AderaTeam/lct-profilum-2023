import { Flex, Image, Loader, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import $api from 'shared/api';
import { Card } from 'shared/components/Card';
import { IUser } from 'shared/models/IUser';
import classnames from 'classnames';

import rank0 from 'shared/assets/ranks/0.png';
import rank1 from 'shared/assets/ranks/1.png';
import rank2 from 'shared/assets/ranks/2.png';
import rank3 from 'shared/assets/ranks/3.png';
import rank4 from 'shared/assets/ranks/4.png';

import style from './TrainingTop.module.scss';
import { IconTrophyFilled } from '@tabler/icons-react';

export const TrainingTop = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const top: { [key: number]: string } = {
    0: 'one',
    1: 'two',
    2: 'three',
  };

  const rankImage: { [key: string]: string } = {
    Незнайка: rank0,
    'Маг-самоучка': rank1,
    'Первый шар': rank2,
    Волшебник: rank3,
    Оракул: rank4,
  };

  useEffect(() => {
    $api.get<IUser[]>('/user').then((response) => setUsers(response.data));
  }, []);

  return (
    <>
      {users.length ? (
        <Card radius="32px">
          <Stack gap={24}>
            <h2 className="h2">Топ-10 игроков</h2>
            <Flex gap={8} wrap={'nowrap'} className={style.scroll}>
              {users
                .sort((a, b) => b.points - a.points)
                .map((item, index: number) => {
                  if (index < 4) {
                    return (
                      <Flex
                        align={'center'}
                        className={classnames(
                          style[`user-card`],
                          style[`${top[index]}`]
                        )}
                        p={12}
                        gap={8}
                        key={item.id}
                      >
                        <p className={style.top}>{index + 1}</p>
                        <Flex gap={12}>
                          <Image
                            src={item.avataruri || rankImage[item.rank]}
                            w={48}
                            h={48}
                            style={{ borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <Stack gap={4}>
                            <p className="text bold">{item.username}</p>
                            <Flex align={'center'} gap={8}>
                              <p
                                className={classnames(
                                  style[`user-card`],
                                  style[`points`],
                                  style[`${top[index]}`]
                                )}
                              >
                                {item.points} баллов
                              </p>
                              {index < 3 ? (
                                <div
                                  className={classnames(
                                    style[`user-card`],
                                    style[`circle`],
                                    style[`${top[index]}`]
                                  )}
                                >
                                  <IconTrophyFilled size={16} />
                                </div>
                              ) : (
                                <></>
                              )}
                            </Flex>
                          </Stack>
                        </Flex>
                      </Flex>
                    );
                  }
                })}
            </Flex>
          </Stack>
        </Card>
      ) : (
        <Stack align="center" justify="center">
          <Loader size={'lg'} color="myColor" />
        </Stack>
      )}
    </>
  );
};
