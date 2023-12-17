import { Flex, Image, Stack } from '@mantine/core';
import { IconArrowBigUpLines, IconCircleCheck } from '@tabler/icons-react';
import { Card } from 'shared/components/Card';
import dayjs from 'dayjs';

import user from 'shared/assets/user.svg';
import { IEvents } from 'shared/models/IEvents';
import { eventsTitleFormater } from 'shared/helpers/eventsTitleFormater';

interface CommunityEventsListProps {
  events: IEvents[];
}

export const CommunityEventsList = ({ events }: CommunityEventsListProps) => {
  return (
    <Stack gap={12}>
      {events.map((item) => (
        <Card key={item.id} radius="32px">
          <Stack gap={24}>
            <Flex gap={8} align={'center'}>
              <Flex
                p={8}
                w={40}
                h={40}
                bg={'#FFE7F7'}
                style={{ borderRadius: '50%' }}
              >
                {item.status === 'up' ? (
                  <IconArrowBigUpLines stroke={1.5} color="#FA1D80" />
                ) : (
                  <IconCircleCheck stroke={1.5} color="#FA1D80" />
                )}
              </Flex>
              <Flex w={757} style={{}}>
                <h2
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  className="h2"
                >
                  {item.status === 'up' ? (
                    <>
                      {item.title.split('до')[0]} до
                      <span className="h2 text pink">
                        {eventsTitleFormater(item.title, item.status)}
                      </span>
                    </>
                  ) : (
                    `${eventsTitleFormater(
                      item.title.replace('№', ''),
                      item.status,
                      item.path.pathSteps
                    )}`
                  )}
                </h2>
              </Flex>
              <p style={{ marginLeft: 'auto' }} className="text gray">
                {dayjs(item.date).format('D MMMM')}
              </p>
            </Flex>
            <Flex
              style={{ borderLeft: '2px solid #DEE2E6' }}
              p={'2px 0px 2px 16px'}
              gap={12}
            >
              <Image
                src={item.author.avataruri || user}
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
