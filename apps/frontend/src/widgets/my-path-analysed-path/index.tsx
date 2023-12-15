import { Flex, Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button } from 'shared/components/Button';
import { ResultCard } from 'shared/components/ResultCard';

export const MyPathAnalysedPath = observer(() => {
  const { UStore } = useContext(Context);

  return (
    <Stack gap={24}>
      <Flex align={'center'} justify={'space-between'}>
        <Stack gap={16}>
          <h2 className="h2">Предлагаемые пути</h2>
          <p className="text black">Выбери 1 или несколько путей</p>
        </Stack>
        <Button title="Подтвердить выбор" />
      </Flex>
      <Stack gap={12}>
        {UStore.user.analysedPaths?.map((item) => (
          <ResultCard />
        ))}
      </Stack>
    </Stack>
  );
});
