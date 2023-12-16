import { Flex, Stack } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { Button } from 'shared/components/Button';
import { Input } from 'shared/components/Input';
import * as VKID from '@vkid/sdk';
import { NO_PAGE_ROUTE } from 'shared/constants/const';
import $api from 'shared/api';

interface SocialCardFormProps {
  name: string;
  getSocials?: Function;
}

export const SocialCardForm = ({ name, getSocials }: SocialCardFormProps) => {
  const { control, watch, handleSubmit } = useForm();
  VKID.Config.set({
    app: 51812541,
    redirectUrl: `https://profilum.adera-team.ru${NO_PAGE_ROUTE}`,
  });

  const handleConnect = handleSubmit((formData) => {
    if (name === 'Вконтакте') {
      VKID.Auth.login();
    } else {
      console.log(formData);
      //getSocials && $api.post('/').then(() => getSocials());
    }
  });

  return (
    <Stack gap={24}>
      <Flex align={'center'} justify={'space-between'}>
        <Controller
          name={`${name}.id`}
          defaultValue={''}
          control={control}
          disabled={watch(`${name}.link`)}
          render={(field) => (
            <Input
              placeholder="53627832"
              w={471.5}
              {...field}
              label="ID аккаунта"
            />
          )}
        />
        <Controller
          name={`${name}.link`}
          control={control}
          defaultValue={''}
          disabled={watch(`${name}.id`)}
          render={(field) => (
            <Input
              placeholder="https://hailie.org"
              w={471.5}
              {...field}
              label="Ссылка на страницу"
            />
          )}
        />
      </Flex>
      <p className="text gray">или войдите через свой аккаунт</p>
      <Button onClick={() => handleConnect()} outline>
        <Flex gap={8}>
          Подключить <IconArrowUpRight stroke={1.5} color="#ADB5BD" />
        </Flex>
      </Button>
    </Stack>
  );
};
