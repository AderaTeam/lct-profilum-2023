import { Avatar, Card, Flex, Stack, Text } from '@mantine/core';
import { Button } from 'shared/components/Button';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { MAGE_ROUTE, MY_SOCIALS_ROUTE } from 'shared/constants/const';

import small from 'shared/assets/card-bg-small.png';
import steam from 'shared/assets/platforms/steam.svg';
import vk from 'shared/assets/platforms/vk.svg';
import od from 'shared/assets/platforms/od.svg';
import tg from 'shared/assets/platforms/tg.svg';
import more from 'shared/assets/platforms/more.svg';

import style from './AnalyseCard.module.scss';
import { IPath } from 'shared/models/IPath';
import { observer } from 'mobx-react-lite';
interface AnalyseCardProps {
  isAnalysed?: boolean;
  paths?: IPath[];
  analysedPaths?: IPath[];
}

export const AnalyseCard = observer(
  ({ isAnalysed, paths, analysedPaths }: AnalyseCardProps) => {
    const icons = [steam, vk, od, tg, more];
    const navigate = useNavigate();

    return (
      <Card radius={32}>
        {!isAnalysed && !(analysedPaths?.length && !paths?.length) && (
          <Card.Section
            h={187}
            style={{
              backgroundImage: `url(${small})`,
              backgroundSize: 'cover',
            }}
          />
        )}
        <Card.Section p={32}>
          <Stack gap={24}>
            <Stack gap={10}>
              <Text className={style.title}>
                {isAnalysed ? (
                  'Мои соц. сети'
                ) : (
                  <>
                    {analysedPaths?.length && !paths?.length ? (
                      'О нет, твой путь не выбран 😱'
                    ) : (
                      <>
                        Проанализируем, кем <br /> ты можешь стать?
                      </>
                    )}
                  </>
                )}
              </Text>
              <Text className={style.text}>
                {isAnalysed
                  ? 'Ты уже проанализировал свои соц. сети, но можешь поменять их в любой момент'
                  : analysedPaths?.length && !paths?.length
                  ? 'Ты уже проанализировал свои соц. сети, но не указал, по какому пути будешь двигаться'
                  : 'Подключи соц. сети, чтобы Профилум смог помочь найти профессиютвоей мечты'}
              </Text>
            </Stack>
            <Flex align={'center'} gap={16}>
              <Button
                outline
                onClick={() =>
                  navigate(
                    analysedPaths?.length && !paths?.length
                      ? MAGE_ROUTE
                      : MY_SOCIALS_ROUTE
                  )
                }
              >
                <Flex gap={8}>
                  {isAnalysed
                    ? 'Изменить'
                    : analysedPaths?.length && !paths?.length
                    ? 'Указать путь'
                    : 'Анализировать'}
                  <IconChevronRight stroke={1.5} color="#ADB5BD" />
                </Flex>
              </Button>
              {analysedPaths?.length && !paths?.length ? (
                <></>
              ) : (
                <Flex align={'center'} gap={0}>
                  {icons.map((icon, index) => (
                    <Avatar
                      style={{ zIndex: icons.length - index }}
                      key={icon}
                      size={32}
                      className={style.icon}
                      src={icon}
                    />
                  ))}
                </Flex>
              )}
            </Flex>
          </Stack>
        </Card.Section>
      </Card>
    );
  }
);
