import { Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ResultCard } from 'shared/components/ResultCard';

export const ResultList = observer(() => {
  const { UStore } = useContext(Context);

  return (
    <Stack gap={12}>
      {UStore.user.analysedPaths?.map((item) => (
        <ResultCard />
      ))}
    </Stack>
  );
});
