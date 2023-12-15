import { Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { MyPathAnalysedPath } from 'widgets/my-path-analysed-path';
import { MyPathProgress } from 'widgets/my-path-progress';

const MyPathPage = observer(() => {
  const { UStore } = useContext(Context);

  return (
    <MainWrapper>
      <Stack gap={48}>
        {UStore.user.paths?.length ? <EducationsSelectedCard /> : <></>}
        {!UStore.user.paths?.length && UStore.user?.analysedPaths?.length ? (
          <MyPathAnalysedPath />
        ) : (
          <MyPathProgress />
        )}
      </Stack>
      <></>
    </MainWrapper>
  );
});

export default MyPathPage;
