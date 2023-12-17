import { Flex, Loader, Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { Avatar } from 'shared/components/Avatar';
import { Button } from 'shared/components/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { ResultList } from './components/ResultList';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from 'main';
import $api from 'shared/api';
import { MY_PATH_ROUTE } from 'shared/constants/const';

import mage from 'shared/assets/mage.png';
import rank0 from 'shared/assets/ranks/0.png';
import rank1 from 'shared/assets/ranks/1.png';
import rank2 from 'shared/assets/ranks/2.png';
import rank3 from 'shared/assets/ranks/3.png';
import rank4 from 'shared/assets/ranks/4.png';

import style from './MageChat.module.scss';

export const MageChat = observer(() => {
  const { UStore } = useContext(Context);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [activeIds, setActiveIds] = useState<number[]>(
    UStore.user.paths.length
      ? UStore.user.paths.map((item) => item.path.id)
      : []
  );

  const rankImage: { [key: string]: string } = {
    Незнайка: rank0,
    'Маг-самоучка': rank1,
    'Первый шар': rank2,
    Волшебник: rank3,
    Оракул: rank4,
  };

  useEffect(() => {
    if (!UStore.user.paths.length) {
      setTimeout(() => {
        setIsShow(true);
      }, 4500);
    } else {
      setIsShow(true);
    }
  }, []);

  useEffect(() => {
    if (!UStore.user.paths.length) {
      if (isShow) {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      setIsLoading(false);
    }
  }, [isShow]);

  const handleSelectPaths = () => {
    $api
      .post('/paths/owned', { pathIds: activeIds, userId: UStore.user.id })
      .then((response) => {
        UStore.setUser({ ...UStore.user, paths: response.data.result });
        navigate(MY_PATH_ROUTE);
      });
  };

  return (
    <Stack w={'100%'} gap={12}>
      <Stack align="flex-end">
        <Card outline radius="24px 2px 24px 24px" w={480} bg="transparent">
          <Stack gap={16}>
            <Avatar
              name={UStore.user.username}
              image={
                UStore.user.image! ||
                UStore.user.avataruri! ||
                rankImage[UStore.user.rank]
              }
            />
            {UStore.user.paths.length ? (
              <p className="text black">
                Профилум, помоги! Хочу знать на кого пойти учиться!
              </p>
            ) : (
              <p className={style.text}>
                Профилум, помоги! Хочу знать на кого пойти учиться!
              </p>
            )}
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
                      Точно! Я вижу, тебе суждено получить профессию{' '}
                      <span className="text pink">
                        {UStore.user.analysedPaths?.length &&
                          `${UStore.user.analysedPaths[0].name!}.`}
                      </span>
                    </p>
                  </Stack>
                  <ResultList
                    activeIds={activeIds}
                    setActiveIds={setActiveIds}
                  />
                  <Flex justify={'space-between'}>
                    <Button onClick={() => navigate(-1)}>
                      <Flex gap={8}>
                        <IconChevronLeft stroke={1.5} color="#ffff" />
                        Назад
                      </Flex>
                    </Button>
                    <Button
                      onClick={() => handleSelectPaths()}
                      disabled={!activeIds.length}
                    >
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
