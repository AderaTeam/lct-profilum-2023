import { Stack } from '@mantine/core';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import TitleWrapper from 'shared/components/Wrappers/TitleWrapper';
import { PathDbTable } from 'widgets/admin/path-db-table';

const PathDbPage = () => {
  return (
    <MainWrapper fullWidth>
      <Stack gap={48}>
        <TitleWrapper title={'База путей'} />
        <PathDbTable />
      </Stack>
      <></>
    </MainWrapper>
  );
};

export default PathDbPage;
