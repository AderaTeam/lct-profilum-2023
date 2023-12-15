import { Flex, Image, Stack, Text } from '@mantine/core';
import { Card } from 'shared/components/Card';

import style from './ProfileAchievement.module.scss';
import { useContext, useEffect, useState } from 'react';
import $api, { API_URL } from 'shared/api';
import { Context } from 'main';

export const ProfileAchievement = () => {
  const { UStore } = useContext(Context);
  const [achievements, setAchievements] = useState<
    { id: number; name: string; date: string }[]
  >([]);

  useEffect(() => {
    $api.get(`/user/${UStore.user.id}/achievements`).then((response) => {
      setAchievements(response.data);
    });
  }, []);

  return (
    <Card>
      <Stack gap={24}>
        <Text className={style.title}>
          Достижения{' '}
          {achievements.length ? <span>({achievements.length})</span> : <></>}
        </Text>
        {achievements.length ? (
          <Flex gap={16} wrap={'wrap'}>
            {achievements.map((item) => (
              <Stack key={item.id} gap={14}>
                <Image
                  className={style.image}
                  w={178.2}
                  h={160}
                  radius={10}
                  src={`${API_URL}/achievement/image/${item.id}`}
                  alt="Изображение достижения"
                />
                <Stack gap={6}>
                  <Text className={style.name}>{item.name}</Text>
                  <Text className={style.date}>{item.date}</Text>
                </Stack>
              </Stack>
            ))}
          </Flex>
        ) : (
          <p className="text black">У вас пока нет полученных достижений(</p>
        )}
      </Stack>
    </Card>
  );
};
