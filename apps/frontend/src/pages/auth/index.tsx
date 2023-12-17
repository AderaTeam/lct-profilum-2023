import { Flex, Image } from '@mantine/core';
import { AuthNavbar } from 'widgets/auth-navbar';

import bg from 'shared/assets/auth-bg.png';

const AuthPage = () => {
  return (
    <div className="wrapper">
      <Flex gap={0}>
        <AuthNavbar />
        <div style={{ position: 'relative', width: '100%' }}>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
            }}
            src={bg}
          />
        </div>
      </Flex>
    </div>
  );
};

export default AuthPage;
