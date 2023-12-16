import { Context } from 'main';
import { useState, useContext, useEffect } from 'react';
import { ActivePathSwitch } from './components/ActivePathSwitch';
import { Flex, Stack } from '@mantine/core';
import { PathInfo } from './components/PathInfo';
import { observer } from 'mobx-react-lite';
import { PathSteps } from './components/PathSteps';
import { NoPath } from './components/NoPath';
import { IAnalazedResult } from 'shared/models/IAnalazedResult';

export const MyPathProgress = observer(() => {
  const { UStore } = useContext(Context);
  const [activePathId, setActivePathId] = useState<number>(
    UStore?.user?.paths.length && UStore.user.paths[0].id
  );
  const [activePath, setActivePath] = useState<IAnalazedResult | undefined>(
    UStore?.user?.paths?.find((item) => item.id === UStore?.user?.paths[0]?.id)
  );

  useEffect(() => {
    if (typeof activePathId !== 'undefined') {
      const info = UStore.user.paths.find((item) => item.id === activePathId);
      setActivePath(info);
    }
  }, [activePathId]);

  const handleStepComplete = (id: number) => {
    console.log(id);
    UStore.setUser({
      ...UStore.user,
      paths: UStore.user.paths.map((item) =>
        item.id === id ? { ...item, currentStep: item.currentStep + 1 } : item
      ),
    });
  };

  return (
    <Stack gap={32}>
      {UStore.user.paths.length ? (
        <>
          <Flex justify={'space-between'} align={'center'}>
            <ActivePathSwitch
              paths={UStore.user.paths}
              activePathId={activePathId}
              setActivePathId={setActivePathId}
            />
            <PathInfo activePath={activePath} />
          </Flex>
          <PathSteps
            handleStepComplete={handleStepComplete}
            activePath={activePath}
          />
        </>
      ) : (
        <NoPath />
      )}
    </Stack>
  );
});
