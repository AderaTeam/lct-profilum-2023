import { Flex } from '@mantine/core';
import { AuthNavbar } from 'widgets/auth-navbar';

import bg from 'shared/assets/auth-bg.png';

const AuthPage = () => {
  return (
    <div className="wrapper">
      <Flex gap={0} w={'100%'}>
        <AuthNavbar />
        <div
          style={{
            backgroundImage: `url(${bg})`,
            objectFit: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
          }}
        ></div>
      </Flex>
    </div>
  );
};

export default AuthPage;
