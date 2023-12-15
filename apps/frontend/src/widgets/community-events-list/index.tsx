import { Flex, Image, Stack } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Card } from 'shared/components/Card';

import mage from 'shared/assets/mage.png';

export const CommunityEventsList = () => {
  const data = [
    {
      title: 'Роман закончил Шаг 3 “Основы типографики”',
      author: {
        username: 'Роман Соколов',
        nickname: '@romai',
        avataruri: null,
      },
      status: '',
      date: '21.10.2023',
    },
  ];

  return (
    <Stack gap={12}>
      {data.map((item) => (
        <Card key={item.title} radius="32px">
          <Stack gap={24}>
            <Flex gap={8} align={'center'}>
              <Flex
                p={8}
                w={40}
                h={40}
                bg={'#FFE7F7'}
                style={{ borderRadius: '50%' }}
              >
                <IconCircleCheck stroke={1.5} color="#FA1D80" />
              </Flex>
              <h2 className="h2">{item.title}</h2>
              <p style={{ marginLeft: 'auto' }} className="text gray">
                {item.date}
              </p>
            </Flex>
            <Flex
              style={{ borderLeft: '2px solid #DEE2E6' }}
              p={'2px 0px 2px 16px'}
              gap={12}
            >
              <Image
                src={item.author.avataruri || mage}
                w={48}
                h={48}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
              <Stack gap={2}>
                <p className="text bold">{item.author.username}</p>
                <p className="text gray">{item.author.nickname}</p>
              </Stack>
            </Flex>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
