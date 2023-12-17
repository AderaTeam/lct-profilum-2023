import { Flex, Stack } from '@mantine/core';
import { Context } from 'main';
import { useState, useEffect, useContext } from 'react';
import $api from 'shared/api';
import { IEvents } from 'shared/models/IEvents';
import { CommunityEventsList } from 'widgets/community-events-list';

export const ProfileEvents = () => {
  const [events, setEvents] = useState<IEvents[]>([]);
  const { UStore } = useContext(Context);

  useEffect(() => {
    $api
      .get<IEvents[]>(`/community/card/${UStore.user.id}`)
      .then((response) => setEvents(response.data ? response.data : []));
  }, []);

  return (
    <>
      {events.length ? (
        <Stack gap={24}>
          <Flex p={'0 32px'}>
            <h1 className="h1">События</h1>
          </Flex>
          <CommunityEventsList events={events} />
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
