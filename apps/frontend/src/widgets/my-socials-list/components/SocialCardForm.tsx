import { Flex, Stack } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'shared/components/Button';
import { Input } from 'shared/components/Input';
import * as VKID from '@vkid/sdk';
import { CONNECT_NO_PAGE_ROUTE } from 'shared/constants/const';
import $api from 'shared/api';
import { useContext } from 'react';
import { Context } from 'main';

interface SocialCardFormProps {
  name: string;
  getSocials?: Function;
}

export const SocialCardForm = ({ name, getSocials }: SocialCardFormProps) => {
  const { control, watch, handleSubmit } = useForm();
  const { UStore } = useContext(Context);
  VKID.Config.set({
    app: 51812541,
    redirectUrl: `https://profilum.adera-team.ru${CONNECT_NO_PAGE_ROUTE}`,
  });

  const handleConnect = handleSubmit((formData) => {
    if (name === 'VK') {
      VKID.Auth.login();
    } else {
      getSocials &&
        $api
          .post('/socials/user', {
            userid: UStore.user.id,
            socialname: name,
            url: formData.url,
            originaluserid: formData.originaluserid,
          })
          .then(() => getSocials());
    }
  });

  return (
    <Stack gap={24}>
      <Flex align={'center'} justify={'space-between'}>
        <Controller
          name={`originaluserid`}
          defaultValue={''}
          control={control}
          disabled={watch(`url`)}
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
          name={`url`}
          control={control}
          defaultValue={''}
          disabled={watch(`originaluserid`)}
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
