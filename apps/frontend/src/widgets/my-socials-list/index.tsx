import { Flex, Stack } from '@mantine/core';
import { SocialCard } from './components/SocialCard';
import { Button } from 'shared/components/Button';

import od from 'shared/assets/mock/od.png';
import tg from 'shared/assets/mock/tg.png';
import vk from 'shared/assets/mock/vk.png';
import steam from 'shared/assets/mock/steam.png';
import pt from 'shared/assets/mock/pt.png';
import { useNavigate } from 'react-router-dom';
import { MAGE_ROUTE } from 'shared/constants/const';
import { FormProvider, useForm } from 'react-hook-form';
import { Card } from 'shared/components/Card';
import { IconAlertCircleFilled } from '@tabler/icons-react';
import { IPath } from 'shared/models/IPath';

interface MySocialsListProps {
  isLoading: boolean;
  handleAnalysis: Function;
  result: IPath[];
}

export const MySocialsList = ({
  isLoading,
  handleAnalysis,
  result,
}: MySocialsListProps) => {
  const navigate = useNavigate();
  const socialForm = useForm();

  const handleAnalysisSubmit = socialForm.handleSubmit((formData) => {
    console.log(formData);
  });

  const data = [
    {
      id: 0,
      name: 'Вконтакте',
      description: 'Сообщества, записи на стене, комментарии',
      image: vk,
      status: 'connected',
    },
    {
      id: 1,
      name: 'Steam',
      description: 'Библиотека игр, статистика по аккаунту',
      image: steam,
      status: 'connected',
    },
    {
      id: 2,
      name: 'Одноклассники',
      description: 'Сообщества, записи на стене, комментарии',
      image: od,
      status: 'available',
    },
    {
      id: 3,
      name: 'Telegram',
      description: 'Подписки на  каналы',
      image: tg,
      status: 'available',
    },
    {
      id: 4,
      name: 'Pinterest',
      description: 'Популярные темы, доски',
      image: pt,
      status: 'soon',
    },
  ];

  return (
    <FormProvider {...socialForm}>
      <Stack gap={48}>
        {data.filter((item) => item.status === 'connected').length ? (
          <Stack gap={24}>
            <Flex justify={'space-between'} align={'center'}>
              <h2 className="h2">Подключенные соц. сети</h2>
              <Button
                disabled={isLoading}
                onClick={
                  !result.length
                    ? () => handleAnalysis()
                    : () => navigate(MAGE_ROUTE)
                }
              >
                {result.length ? 'Узнать результат' : 'Проанализировать'}
              </Button>
            </Flex>
            <Stack gap={12}>
              {data
                .filter((item) => item.status === 'connected')
                .map((item) => (
                  <SocialCard
                    isLoading={isLoading}
                    key={item.id}
                    social={item}
                  />
                ))}
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
        {data.filter((item) => item.status === 'available').length ? (
          <Stack gap={24}>
            <h2 className="h2">Доступные соц.сети для подключения</h2>
            <Card bg="#E0EEFF" p="24px 32px" radius="12px">
              <Flex gap={12}>
                <IconAlertCircleFilled style={{ color: '#2F80ED' }} />
                <p className="text black">
                  Подключите все желаемые соц. сети, прежде чем анализировать
                </p>
              </Flex>
            </Card>
            <Stack gap={12}>
              {data
                .filter((item) => item.status === 'available')
                .map((item) => (
                  <SocialCard key={item.id} social={item} />
                ))}
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
        {data.filter((item) => item.status === 'soon').length ? (
          <Stack gap={24}>
            <h2 className="h2">Скоро</h2>
            <Stack gap={12}>
              {data
                .filter((item) => item.status === 'soon')
                .map((item) => (
                  <SocialCard key={item.id} social={item} />
                ))}
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </FormProvider>
  );
};
