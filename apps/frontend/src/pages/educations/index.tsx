import { Stack } from '@mantine/core';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { EducationsUniversity } from 'widgets/educations-university';

const EducationsPage = () => {
  return (
    <MainWrapper>
      <Stack gap={48}>
        <EducationsSelectedCard />
        <EducationsUniversity />
      </Stack>
      <></>
    </MainWrapper>
  );
};

export default EducationsPage;
