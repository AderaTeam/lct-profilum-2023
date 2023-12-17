import { Flex, Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { EducationsSelectedCard } from 'widgets/educations-selected-card';
import { EducationsUniversity } from 'widgets/educations-university';
import { IUniversity } from 'shared/models/IUniversity';
import { Input } from 'shared/components/Input';
import { useContext, useEffect, useState } from 'react';

import $api from 'shared/api';
import { Context } from 'main';

const EducationsPage = () => {
  const { control, watch } = useForm();
  const { UStore } = useContext(Context);
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity[]>(
    []
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [university, setUniversity] = useState<IUniversity[]>([]);

  const getAllUniversity = () => {
    $api.get('/university').then((response) => {
      setUniversity(response.data);
    });
  };

  const getSelectedUniversity = () => {
    $api.get(`/user/${UStore.user.id}/uni`).then((response) => {
      setSelectedUniversity(response.data);
    });
  };

  const handleSelectUniversity = (university: IUniversity) => {
    $api
      .post('/user/uni', { userid: UStore.user.id, uniid: university.id })
      .then(() => getSelectedUniversity());
  };

  const handleDeleteUniversity = (university: IUniversity) => {
    $api
      .delete('/user/uni', {
        data: { userid: UStore.user.id, uniid: university.id },
      })
      .then(() => getSelectedUniversity());
  };

  useEffect(() => {
    getAllUniversity();
    getSelectedUniversity();
  }, []);

  useEffect(() => {
    setSelectedIds(selectedUniversity.map((item) => item.id));
  }, [selectedUniversity]);

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
          selectedIds={selectedIds}
          handleSelectUniversity={handleSelectUniversity}
          handleDeleteUniversity={handleDeleteUniversity}
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
