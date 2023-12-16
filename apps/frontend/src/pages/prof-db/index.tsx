import { Stack } from '@mantine/core';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import TitleWrapper from 'shared/components/Wrappers/TitleWrapper';
import { ProfDbTable } from 'widgets/admin/rof-db-table';

const ProfDbPage = () => {
  return (
    <MainWrapper fullWidth>
      <Stack gap={48}>
        <TitleWrapper title={'База профессий'} />
        <ProfDbTable />
      </Stack>
      <></>
    </MainWrapper>
  );
};

export default ProfDbPage;
