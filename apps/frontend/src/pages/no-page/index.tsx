import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import $api from 'shared/api';
import { MY_SOCIALS_ROUTE } from 'shared/constants/const';

const NoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const indexToken = location.search.split('%22').indexOf('token') + 2;
    const indeUuid = location.search.split('%22').indexOf('uuid') + 2;
    $api
      .post(
        `/auth/vk?silent_token=${
          location.search.split('%22')[indexToken]
        }&uuid=${location.search.split('%22')[indeUuid]}`
      )
      .then(() => navigate(MY_SOCIALS_ROUTE));
  }, []);

  return <></>;
};

export default NoPage;
