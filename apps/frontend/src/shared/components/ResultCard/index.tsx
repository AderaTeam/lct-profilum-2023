import { Avatar, Flex, Stack } from '@mantine/core';
import { Card } from '../Card';

import avatar from 'shared/assets/result-avatar.svg';
import { Chip } from '../Chip';

export const ResultCard = () => {
  return (
    <Card>
      <Flex justify={'space-between'} align={'center'}>
        <Flex gap={24} align={'flex-start'}>
          <Avatar src={avatar} size={64} />
          <Stack w={668} gap={12}>
            <h2 className="h2">Системный аналитик</h2>
            <p className="text black">
              Небольшое описание специальности и ключевые навыки бла бла бла
              ыываваыв а. Программирование... Дизайн... IT
            </p>
            <Flex gap={12}>
              <div className="text gray">#09.03.02</div>
              <div className="text gray">#09.03.02</div>
              <div className="text gray">#09.03.02</div>
            </Flex>
          </Stack>
        </Flex>
        <Chip text="Убрать этот путь" />
      </Flex>
    </Card>
  );
};
