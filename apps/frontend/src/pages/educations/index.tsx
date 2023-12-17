import { Flex, Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { EducationsUniversity } from 'widgets/educations-university';
import { IUniversity } from 'shared/models/IUniversity';
import { Input } from 'shared/components/Input';
import { useEffect, useState } from 'react';

import $api from 'shared/api';

const EducationsPage = () => {
  const { control, watch } = useForm();
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity[]>(
    []
  );
  const [university, setUniversity] = useState<IUniversity[]>([]);

  const getAllUnivercity = () => {
    $api.get('/university').then((response) => {
      setUniversity(response.data);
    });
  };

  const getSelectedUnivercity = () => {
    setSelectedUniversity([]);
  };

  const handleSelectUnivercity = (university: IUniversity) => {
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
