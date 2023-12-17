import { Stack } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { StatDiagrams } from 'widgets/admin/stat-diagrams';
import { StatDiagramsFilter } from 'widgets/admin/stat-diagrams-filter';

const StatPage = () => {
  const diagramForm = useForm({
    defaultValues: {
      rightFilter: 'Самые популярные специальности',
      leftFilter: 'Самые часто используемые соц. сети  и онлайн сервисы',
    },
  });

  return (
    <FormProvider {...diagramForm}>
      <MainWrapper>
        <Stack gap={48}>
          <StatDiagrams />
        </Stack>
        <StatDiagramsFilter />
      </MainWrapper>
    </FormProvider>
  );
};

export default StatPage;
