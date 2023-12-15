import { Flex, Stack } from '@mantine/core';
import { CommunityEventsList } from 'widgets/community-events-list';

export const ProfileEvents = () => {
  const data = [1];

  return (
    <>
      {data.length ? (
        <Stack gap={24}>
          <Flex p={'0 32px'}>
            <h1 className="h1">События</h1>
          </Flex>
          <CommunityEventsList />
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
