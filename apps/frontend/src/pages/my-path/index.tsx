import { Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { MyPathProgress } from 'widgets/my-path-progress';

const MyPathPage = observer(() => {
  const { UStore } = useContext(Context);

  return (
    <MainWrapper>
      <Stack gap={48}>
        {UStore.user.paths ? <EducationsSelectedCard /> : <></>}
        <MyPathProgress />
      </Stack>
      <></>
    </MainWrapper>
  );
});

export default MyPathPage;
