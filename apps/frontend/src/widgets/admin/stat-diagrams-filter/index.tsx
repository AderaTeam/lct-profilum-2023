import { Stack } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from 'shared/components/Select';
import { Card } from 'shared/components/Card';
import { rightData } from 'shared/constants/rightData';
import { lefttData } from 'shared/constants/leftData';

export const StatDiagramsFilter = () => {
  const { control } = useFormContext();

  const rightKeys = Object.keys(rightData).map((item) => {
    return { value: item, label: item };
  });

  const lefttKeys = Object.keys(lefttData).map((item) => {
    return { value: item, label: item };
  });

  return (
    <Card radius="32px">
      <Stack gap={24}>
        <h3 className="h3">Ввод данных</h3>
        <Controller
          control={control}
          name="leftFilter"
          defaultValue={'Самые часто используемые соц. сети  и онлайн сервисы'}
          render={({ field }) => (
            <Select
              label="Общая информация"
              placeholder="Общая информация"
              data={lefttKeys}
              field={field}
            />
          )}
        />
        <Controller
          control={control}
          name="rightFilter"
          defaultValue={'Самые популярные специальности'}
          render={({ field }) => (
            <Select
              label="Информация по специальностям"
              placeholder="Информация по специальностям"
              data={rightKeys}
              field={field}
            />
          )}
        />
      </Stack>
    </Card>
  );
};
