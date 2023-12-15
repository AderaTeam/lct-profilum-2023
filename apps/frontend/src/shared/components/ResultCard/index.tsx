import { Avatar, Flex, Stack } from '@mantine/core';
import { Card } from '../Card';

import avatar from 'shared/assets/result-avatar.svg';
import { Chip } from '../Chip';

interface ResultCardProps {
  name: string;
  id: number;
  activeIds: number[];
  handleChange: Function;
}

export const ResultCard = ({
  name,
  id,
  activeIds,
  handleChange,
}: ResultCardProps) => {
  return (
    <Card>
      <Flex justify={'space-between'} align={'center'}>
        <Flex gap={24} align={'flex-start'}>
          <Avatar src={avatar} size={64} />
          <Stack w={668} gap={12}>
            <h2 className="h2">{name}</h2>
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
        <Chip
          onClick={() => handleChange(id)}
          activeIds={activeIds}
          id={id}
          text={
            activeIds.find((item) => item === id)
              ? 'Убрать этот путь'
              : 'Выбрать этот путь'
          }
        />
      </Flex>
    </Card>
  );
};
