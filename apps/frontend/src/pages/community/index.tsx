import { Stack, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import $api from 'shared/api';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { IEvents } from 'shared/models/IEvents';
import { CommunityEventsList } from 'widgets/community-events-list';
import { CommunityFilter } from 'widgets/community-filter';

const CommunityPage = () => {
  const [events, setEvents] = useState<IEvents[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string>('all');

  useEffect(() => {
    $api
      .get<IEvents[]>('/community/card')
      .then((response) => setEvents(response.data ? response.data : []));
  }, []);

  useEffect(() => {
    if (events.length) {
      setPaths([...new Set(events.map((item) => item.path.name))]);
    }
  }, [events]);

  return (
    <MainWrapper>
      <>
        {events.length ? (
          <Stack gap={48}>
            <CommunityFilter
              activePath={activePath}
              setActivePath={setActivePath}
              paths={paths}
            />
            <CommunityEventsList
              events={
                activePath === 'all'
                  ? events
                  : events.filter((item) => item.path.name === activePath)
              }
            />
          </Stack>
        ) : (
          <Stack align="center" justify="center">
            <Loader size={'lg'} color="myColor" />
          </Stack>
        )}
      </>

      <></>
    </MainWrapper>
  );
};

export default CommunityPage;
