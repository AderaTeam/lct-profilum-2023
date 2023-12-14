import { Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { EducationsUniversity } from 'widgets/educations-university';
import { IUniversity } from 'shared/models/IUniversity';
import { Input } from 'shared/components/Input';

import img1 from 'shared/assets/university/1.png';
import img2 from 'shared/assets/university/2.png';

const EducationsPage = () => {
  const { control, watch } = useForm();
  const data: IUniversity[] = [
    {
      name: 'Омский Государственный Технический Университет',
      city: 'Омск',
      popularity: 'Средняя',
      students: 5000,
      budgetPlaces: true,
      tags: ['ТОП 20', 'ПОДХОДИТ ПОД ВАШ ПУТЬ', 'МИН БАЛЛ - 200'],
      image: img1,
    },
    {
      name: 'МГУ имени Ломоносова',
      city: 'Омск',
      popularity: 'Высокая',
      students: 5000,
      budgetPlaces: true,
      tags: ['ТОП 20', 'ПОДХОДИТ ПОД ВАШ ПУТЬ', 'МИН БАЛЛ - 200'],
      image: img2,
    },
  ];

  return (
    <MainWrapper>
      <Stack gap={48}>
        <EducationsSelectedCard />
        <Controller
          name="filter"
          defaultValue={''}
          control={control}
          render={(field) => <Input {...field} placeholder="Поиск" w={340} />}
        />
        <EducationsUniversity
          university={data.filter((item) =>
            item.name
              .toLowerCase()
              .includes(watch('filter')?.toLowerCase() || '')
          )}
        />
      </Stack>
      <></>
    </MainWrapper>
  );
};

export default EducationsPage;
