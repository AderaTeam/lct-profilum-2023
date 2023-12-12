import { Flex } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'shared/components/Input';

export const ProfileEdit = () => {
  const { control } = useForm();

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
    </Flex>
  );
};
