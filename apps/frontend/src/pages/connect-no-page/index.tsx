import { Loader, Stack } from '@mantine/core';
import { Context } from 'main';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import $api from 'shared/api';
import { MY_SOCIALS_ROUTE } from 'shared/constants/const';

const ConnectNoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const indexToken = location.search.split('%22').indexOf('token') + 2;
    const indexUuid = location.search.split('%22').indexOf('uuid') + 2;
    $api
      .post(
        `/socials/vk?silent_token=${
          location.search.split('%22')[indexToken]
        }&uuid=${location.search.split('%22')[indexUuid]}`
      )
      .then(() => navigate(MY_SOCIALS_ROUTE));
  }, []);

  return (
    <Stack h={'100vh'} bg={'gray.0'} align="center" justify="center">
      <Loader size="xl" color="myColor.5" />
    </Stack>
  );
};

export default ConnectNoPage;
