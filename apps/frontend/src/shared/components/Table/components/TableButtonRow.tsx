import { Flex } from '@mantine/core';
import { IconArrowsMaximize } from '@tabler/icons-react';
import { Button } from 'shared/components/Button';

interface TableButtonRowProps {
  handleExport: Function;
}

export const TableButtonRow = ({ handleExport }: TableButtonRowProps) => {
  return (
    <Flex w={'100%'} p={16} justify={'space-between'} align={'center'}>
      <Button onClick={() => handleExport()} outline>
        Экспорт
      </Button>
      <IconArrowsMaximize stroke={1.5} />
    </Flex>
  );
};
