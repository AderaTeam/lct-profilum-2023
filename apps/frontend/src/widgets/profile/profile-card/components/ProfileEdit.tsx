import { Flex } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'shared/components/Input';
import { Select } from 'shared/components/Select';

export const ProfileEdit = () => {
  const { control } = useFormContext();
  const selectData = [
    { label: '11 класс', value: '11 класс' },
    { label: '10 класс', value: '10 класс' },
    { label: '9 класс', value: '9 класс' },
    { label: '8 класс', value: '8 класс' },
  ];

  return (
    <Flex gap={16}>
      <Controller
        name="nickname"
        control={control}
        render={(field) => <Input label="Ник" w={364} {...field} />}
      />
      <Controller
        name="username"
        control={control}
        render={(field) => (
          <Input label="Имя пользователя" w={364} {...field} />
        )}
      />
      <Controller
        name="grade"
        control={control}
        render={(field) => (
          <Select data={selectData} label="Класс обучения" w={195} {...field} />
        )}
      />
    </Flex>
  );
};
