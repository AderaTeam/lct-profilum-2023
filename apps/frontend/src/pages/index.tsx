import { Flex, Stack } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { HOME_ROUTE, MAGE_ROUTE, MY_PATH_ROUTE } from 'shared/constants/const';
import { authRoutes } from 'shared/constants/routes';
import Navbar from 'widgets/navbar';

export const Routing = observer(() => {
  const location = useLocation();

  if (location.pathname === HOME_ROUTE) {
    return <Navigate to={MY_PATH_ROUTE} />;
  }

  return (
    <Flex bg={'gray.0'} className="wrapper" style={{ height: '100vh' }}>
      <Flex>
        {location.pathname !== MAGE_ROUTE && (
          <div className="wrapper">
            <Navbar />
          </div>
        )}
        <Stack w={'100%'} align="center">
          <Routes>
            {authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Stack>
      </Flex>
    </Flex>
  );
});
