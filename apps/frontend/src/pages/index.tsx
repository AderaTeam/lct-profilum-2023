import { Flex, Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  MAGE_ROUTE,
  MY_PATH_ROUTE,
  NO_PAGE_ROUTE,
  ONBOARDING_ROUTE,
  REGISTRATION_ROUTE,
} from 'shared/constants/const';
import { authRoutes, publicRoutes } from 'shared/constants/routes';
import Navbar from 'widgets/navbar';

export const Routing = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { UStore } = useContext(Context);

  if (
    UStore.isAuth &&
    !authRoutes.find((item) => item.path.includes(location.pathname))
  ) {
    return <Navigate to={MY_PATH_ROUTE} />;
  } else if (
    location.pathname === HOME_ROUTE &&
    localStorage.getItem('token')
  ) {
    return <Navigate to={MY_PATH_ROUTE} />;
  } else if (
    !localStorage.getItem('token') &&
    !publicRoutes.find((item) => item.path.includes(location.pathname))
  ) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  return (
    <Flex bg={'gray.0'} className="wrapper" style={{ height: '100vh' }}>
      <Flex>
        {location.pathname !== MAGE_ROUTE &&
          location.pathname !== ONBOARDING_ROUTE &&
          location.pathname !== NO_PAGE_ROUTE &&
          UStore.isAuth && (
            <div style={{ width: 'fit-content' }} className="wrapper">
              <Navbar />
            </div>
          )}
        <Stack w={'100%'} align="center">
          <Routes>
            {UStore.isAuth && UStore.user.role === 'user'
              ? authRoutes
                  .filter((item) => !item.isAdmin) //!
                  .map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                  ))
              : UStore.isAuth &&
                UStore.user.role === 'admin' &&
                authRoutes
                  .filter((item) => item.isAdmin) //
                  .map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                  ))}
            {!UStore.isAuth &&
              publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
          </Routes>
        </Stack>
      </Flex>
    </Flex>
  );
});
