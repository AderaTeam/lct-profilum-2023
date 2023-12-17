import { Flex, Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { LeftDiagram } from './components/LeftDiagram';
import { RightDiagram } from './components/RightDiagram';
import { CenterDiagram } from './components/CenterDiagram';

export const StatDiagrams = () => {
  return (
    <Stack gap={12}>
      <Flex align={'center'} gap={12}>
        <Card w={'50%'}>
          <LeftDiagram />
        </Card>
        <Card w={'50%'}>
          <RightDiagram />
        </Card>
      </Flex>
      <Card>
        <CenterDiagram />
      </Card>
    </Stack>
  );
};
