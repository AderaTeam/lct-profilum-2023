import { Flex, Stack } from '@mantine/core';
import { SocialCard } from './components/SocialCard';
import { Button } from 'shared/components/Button';
import { useNavigate } from 'react-router-dom';
import { MAGE_ROUTE } from 'shared/constants/const';
import { Card } from 'shared/components/Card';
import { IconAlertCircleFilled } from '@tabler/icons-react';
import { IPath } from 'shared/models/IPath';
import { useContext, useEffect, useState } from 'react';
import { ISocial } from 'shared/models/ISocial';
import $api from 'shared/api';
import { Context } from 'main';

import pt from 'shared/assets/mock/pt.png';
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
  const [socials, setSocials] = useState<ISocial[]>([]);
  const { UStore } = useContext(Context);

  const getSocials = () => {
    $api
      .get(`/socials/user/${UStore.user.id}`)
      .then((response) => setSocials(response.data.socials));
  };

  useEffect(() => {
    getSocials();
  }, []);

  const data = [
    {
      id: 4,
      name: 'Pinterest',
      description: 'Популярные темы, доски',
      image: pt,
      status: 'soon',
    },
  ];

  return (
    <Stack gap={48}>
      {socials.filter((item) => item.status === 'connected').length ? (
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
            {socials
              .filter((item) => item.status === 'connected')
              .map((item) => (
                <SocialCard isLoading={isLoading} key={item.id} social={item} />
              ))}
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
      {socials.filter((item) => item.status === 'avalible').length ? (
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
            {socials
              .filter((item) => item.status === 'avalible')
              .map((item) => (
                <SocialCard
                  getSocials={getSocials}
                  key={item.id}
                  social={item}
                />
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
  );
};
