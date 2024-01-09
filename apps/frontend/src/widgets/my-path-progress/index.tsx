import { Context } from 'main';
import { useState, useContext, useEffect } from 'react';
import { ActivePathSwitch } from './components/ActivePathSwitch';
import { Flex, Stack } from '@mantine/core';
import { PathInfo } from './components/PathInfo';
import { observer } from 'mobx-react-lite';
import { PathSteps } from './components/PathSteps';
import { NoPath } from './components/NoPath';
import { IAnalazedResult } from 'shared/models/IAnalazedResult';
import $api from 'shared/api';
import { IUser } from 'shared/models/IUser';

export const MyPathProgress = observer(() => {
  const { UStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [activePathId, setActivePathId] = useState<number>(
    UStore?.user?.paths.length && UStore.user.paths[0].id
  );
  const [activePath, setActivePath] = useState<IAnalazedResult | undefined>(
    UStore?.user?.paths?.find((item) => item.id === UStore?.user?.paths[0]?.id)
  );
  const [currentStep, setCurrentStep] = useState<number>(
    UStore?.user?.paths.length ? UStore.user.paths[0].currentStep : 0
  );

  useEffect(() => {
    if (typeof activePathId !== 'undefined') {
      const info = UStore.user.paths.find((item) => item.id === activePathId);
      setActivePath(info);
      setCurrentStep(info?.currentStep!);
    }
  }, [activePathId]);

  const handleStepComplete = (id: number) => {
    setIsLoading(true);
    $api
      .post<IUser>(`/paths/progress/${id}`)
      .then((response) => {
        UStore.setUser(response.data);
        setCurrentStep(
          response.data.paths.find((item) => item.id === activePathId)
            ?.currentStep!
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Stack gap={32}>
      {UStore?.user?.paths.length ? (
        <>
          <Flex justify={'space-between'} align={'center'}>
            <ActivePathSwitch
              paths={UStore.user?.paths ? UStore.user?.paths : []}
              activePathId={activePathId}
              setActivePathId={setActivePathId}
            />
            <PathInfo currentStep={currentStep} activePath={activePath} />
          </Flex>
          <PathSteps
            isLoading={isLoading}
            currentStep={currentStep}
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
