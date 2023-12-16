import { Flex, Stack } from '@mantine/core';
import { IEvents } from 'shared/models/IEvents';
import { CommunityEventsList } from 'widgets/community-events-list';

export const ProfileEvents = () => {
  const data: IEvents[] = [
    {
      title: 'Роман закончил Шаг 3 “Основы типографики”',
      author: {
        username: 'Роман Соколов',
        nickname: '@romai',
        avataruri: '',
      },
      status: 'up',
      date: '21.10.2023',
    },
  ];

  return (
    <>
      {data.length ? (
        <Stack gap={24}>
          <Flex p={'0 32px'}>
            <h1 className="h1">События</h1>
          </Flex>
          <CommunityEventsList events={data} />
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
