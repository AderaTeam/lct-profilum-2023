import { Flex, Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import $api from 'shared/api';
import { Button } from 'shared/components/Button';
import { ResultCard } from 'shared/components/ResultCard';

export const MyPathAnalysedPath = observer(() => {
  const { UStore } = useContext(Context);
  const [activeIds, setActiveIds] = useState<number[]>([]);

  const handleChange = (id: number) => {
    if (activeIds.find((item) => item === id)) {
      setActiveIds((prevState) => prevState.filter((item) => item !== id));
    } else {
      setActiveIds((prevState) => [...prevState, id]);
    }
  };

  const handleSelectPaths = () => {
    $api
      .post('/paths/owned', { pathIds: activeIds, userId: UStore.user.id })
      .then((response) => {
        UStore.setUser({ ...UStore.user, paths: response.data });
      });
  };

  return (
    <Stack gap={24}>
      <Flex align={'center'} justify={'space-between'}>
        <Stack gap={16}>
          <h2 className="h2">Предлагаемые пути</h2>
          <p className="text black">Выбери 1 или несколько путей</p>
        </Stack>
        <Button
          onClick={() => handleSelectPaths()}
          disabled={!activeIds.length}
          title="Подтвердить выбор"
        />
      </Flex>
      <Stack gap={12}>
        {UStore.user.analysedPaths?.map((item) => (
          <ResultCard
            activeIds={activeIds}
            handleChange={handleChange}
            key={item.id}
            name={item.name}
            id={item.id}
          />
        ))}
      </Stack>
    </Stack>
  );
});
