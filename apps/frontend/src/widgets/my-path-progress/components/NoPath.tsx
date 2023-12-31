import { Flex, Stack } from '@mantine/core';
import { Button } from 'shared/components/Button';
import { IconChevronRight } from '@tabler/icons-react';
import { MY_SOCIALS_ROUTE } from 'shared/constants/const';
import { useNavigate } from 'react-router-dom';

import bg from 'shared/assets/404.png';

export const NoPath = () => {
  const navigate = useNavigate();

  return (
    <Flex justify={'center'} align={'center'}>
      <Stack align="center" gap={32}>
        <div
          style={{
            width: '400px',
            height: '400px',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'round',
          }}
        ></div>

        <Stack gap={16} align="center">
          <h2 className="h2">Твой путь еще не найден</h2>
          <p style={{ textAlign: 'center' }} className="text">
            Подключи соц. сети, чтобы увидеть свой путь и шаги, <br /> которые
            тебе нужно сделать
          </p>
        </Stack>
        <Button onClick={() => navigate(MY_SOCIALS_ROUTE)}>
          <Flex gap={8}>
            Подключить
            <IconChevronRight stroke={1.5} color="#FFFF" />
          </Flex>
        </Button>
      </Stack>
    </Flex>
  );
};
