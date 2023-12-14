import { Stack } from '@mantine/core';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { MyPathProgress } from 'widgets/my-path-progress';

const MyPathPage = () => {
  return (
    <MainWrapper>
      <Stack gap={48}>
        <EducationsSelectedCard />
        <MyPathProgress />
      </Stack>

      <></>
    </MainWrapper>
  );
};

export default MyPathPage;
