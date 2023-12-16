import { Flex } from '@mantine/core';
import { IconArrowsMaximize } from '@tabler/icons-react';
import { Button } from 'shared/components/Button';

export const TableButtonRow = () => {
  return (
    <Flex w={'100%'} p={16} align={'center'}>
      <Button outline>Экспорт</Button>
      <IconArrowsMaximize stroke={1.5} />
    </Flex>
  );
};
