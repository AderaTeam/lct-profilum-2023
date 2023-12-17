import { Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import $api from 'shared/api';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { IUniversity } from 'shared/models/IUniversity';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { MyPathAnalysedPath } from 'widgets/my-path-analysed-path';
import { MyPathProgress } from 'widgets/my-path-progress';
import { MyPathRank } from 'widgets/my-path-rank';

const MyPathPage = observer(() => {
  const { UStore } = useContext(Context);
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity[]>(
    []
  );

  useEffect(() => {
    $api.get(`/user/${UStore.user.id}/uni`).then((response) => {
      setSelectedUniversity(response.data ? response.data : []);
    });
  }, []);

  return (
    <MainWrapper>
      <Stack gap={48}>
        {UStore.user.paths?.length ? (
          <>
            <MyPathRank />
            <EducationsSelectedCard selectedUniversity={selectedUniversity} />
          </>
        ) : (
          <></>
        )}
        {UStore.user.paths.length ? (
          <MyPathProgress />
        ) : UStore.user?.analysedPaths?.length ? (
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
