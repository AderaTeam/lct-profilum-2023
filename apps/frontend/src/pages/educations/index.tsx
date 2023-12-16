import { Flex, Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { EducationsUniversity } from 'widgets/educations-university';
import { IUniversity } from 'shared/models/IUniversity';
import { Input } from 'shared/components/Input';

import img1 from 'shared/assets/university/1.png';
import img2 from 'shared/assets/university/2.png';
import { useEffect, useState } from 'react';
import { ResultCard } from 'shared/components/ResultCard';

const EducationsPage = () => {
  const { control, watch } = useForm();
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity[]>(
    []
  );
  const [university, setUniversity] = useState<IUniversity[]>([]);

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
    {
      name: 'Достоевского',
      city: 'Омск',
      popularity: 'Низкая',
      students: 5000,
      budgetPlaces: true,
      tags: ['ТОП 20', 'ПОДХОДИТ ПОД ВАШ ПУТЬ', 'МИН БАЛЛ - 200'],
      image: img2,
    },
  ];

  const data2 = [
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

  const getAllUnivercity = () => {
    setUniversity(data);
  };

  const getSelectedUnivercity = () => {
    setSelectedUniversity(data2);
  };

  const handleSelectUnivercity = (university: IUniversity) => {
    console.log(university);
    getSelectedUnivercity();
  };

  useEffect(() => {
    getAllUnivercity();
    getSelectedUnivercity();
  }, []);

  return (
    <MainWrapper>
      <Stack gap={48}>
        <EducationsSelectedCard selectedUniversity={selectedUniversity} />
        <Flex gap={32}>
          <Controller
            name="filter"
            defaultValue={''}
            control={control}
            render={(field) => <Input {...field} placeholder="Поиск" w={340} />}
          />
        </Flex>
        <EducationsUniversity
          handleSelectUnivercity={handleSelectUnivercity}
          university={university.filter((item) =>
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
