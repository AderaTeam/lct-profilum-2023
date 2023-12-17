import { Stack } from '@mantine/core';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { TrainingTop } from 'widgets/training-top';

const TrainingPage = () => {
  return (
    <MainWrapper>
      <Stack gap={48}>
        <TrainingTop />
      </Stack>
      <></>
    </MainWrapper>
  );
};

export default TrainingPage;
