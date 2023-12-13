import { Flex, Image, Stack } from '@mantine/core';
import style from './AuthNavbar.module.scss';

import logo from 'shared/assets/logo.svg';
import { Chip } from 'shared/components/Chip';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AuthForm } from './components/AuthFrom';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from 'shared/constants/const';

export const AuthNavbar = () => {
  const location = useLocation();
  const [activeRole, setActiveRole] = useState(0);
  const authFrom = useForm();

  const handleRoleChange = (id: number) => {
    setActiveRole(id);
    authFrom.reset();
  };

  useEffect(() => {
    authFrom.reset();
  }, [location]);

  if (location.pathname === REGISTRATION_ROUTE && activeRole === 0) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return (
    <Stack gap={88} className={style.navbar}>
      <Image src={logo} />
      <Stack align="center" gap={40}>
        <h1 className="h1">
          {location.pathname === LOGIN_ROUTE ? 'Вход' : 'Регистрация'}
        </h1>
        <Flex gap={8}>
          <Chip
            aciveId={activeRole}
            id={0}
            onClick={() => handleRoleChange(0)}
            text={'Администратор'}
          />
          <Chip
            aciveId={activeRole}
            id={1}
            onClick={() => handleRoleChange(1)}
            text={'Школьник'}
          />
        </Flex>
        <FormProvider {...authFrom}>
          <AuthForm activeRole={activeRole} />
        </FormProvider>
      </Stack>
    </Stack>
  );
};
