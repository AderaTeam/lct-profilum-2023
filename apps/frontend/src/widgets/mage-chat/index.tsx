import { Flex, Loader, Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { Avatar } from 'shared/components/Avatar';

import mage from 'shared/assets/mage.png';

import style from './MageChat.module.scss';
import { Button } from 'shared/components/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { ResultList } from './components/ResultList';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from 'main';

export const MageChat = observer(() => {
  const { UStore } = useContext(Context);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 4500);
  }, []);

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isShow]);

  useEffect(() => {
    if (!isLoading) {
      UStore.setUser({
        ...UStore.user,
        analysedPaths: [
          {
            id: 0,
            name: 'Frontend - разработка',
            steps: [
              {
                step: 1,
                title:
                  'Посмотрите видео “Что такое клиент-серверное взаимодействие?”',
                status: 'Завершено',
                points: 20,
                tags: ['#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ', '#WEB'],
                content: {
                  link: '123',
                  questionsCount: 2,
                },
              },
              {
                step: 2,
                title:
                  'Посмотрите видео “Что такое клиент-серверное взаимодействие?”',
                status: 'В процессе',
                points: 20,
                tags: ['#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ', '#WEB'],
                content: {
                  link: '123',
                  questionsCount: 2,
                },
              },
              {
                step: 3,
                title: 'test',
                status: 'Не начато',
                points: 20,
                tags: ['#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ', '#WEB'],
                content: {
                  link: '123',
                  questionsCount: 2,
                },
              },
              {
                step: 4,
                title:
                  'Посмотрите видео “Что такое клиент-серверное взаимодействие?”',
                status: 'Не начато',
                points: 20,
                tags: ['#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ', '#WEB'],
                content: {
                  link: '123',
                  questionsCount: 2,
                },
              },
              {
                step: 5,
                title: 'test',
                status: 'Не начато',
                points: 20,
                tags: ['#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ', '#WEB'],
                content: {
                  link: '123',
                  questionsCount: 2,
                },
              },
            ],
          },
        ],
      });
    }
  }, [isLoading]);

  return (
    <Stack w={'100%'} gap={12}>
      <Stack align="flex-end">
        <Card outline radius="24px 2px 24px 24px" w={480} bg="transparent">
          <Stack gap={16}>
            <Avatar name={UStore.user.username} image={UStore.user.avatar!} />
            <p className={style.text}>
              Профилум, помоги! Хочу знать на кого пойти учиться!
            </p>
          </Stack>
        </Card>
      </Stack>
      {isShow && (
        <>
          {isLoading ? (
            <Loader size={'xl'} color="gray" type="dots" />
          ) : (
            <Stack>
              <Card radius="2px 24px 24px 24px" bg="#F8F9FA">
                <Stack gap={32}>
                  <Stack gap={16}>
                    <Avatar name="Профилум" image={mage} />
                    <p className="text black">
                      Вижу... тебя в учебном заведении твоей мечты! А там... что
                      это? Программирование... Дизайн... IT... Хмммм. <br />{' '}
                      Точно! Я вижу, тебе суждено стать{' '}
                      <span className="text pink">Системным аналитиком!</span>
                    </p>
                  </Stack>
                  <ResultList />
                  <Flex justify={'space-between'}>
                    <Button onClick={() => navigate(-1)}>
                      <Flex gap={8}>
                        <IconChevronLeft stroke={1.5} color="#ffff" />
                        Назад
                      </Flex>
                    </Button>
                    <Button disabled>
                      <Flex gap={8}>
                        К мои путям
                        <IconChevronRight stroke={1.5} color="#ffff" />
                      </Flex>
                    </Button>
                  </Flex>
                </Stack>
              </Card>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
});
