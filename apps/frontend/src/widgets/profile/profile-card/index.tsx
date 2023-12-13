import { Avatar, Card, Flex, Stack, Image, Text } from '@mantine/core';
import { Button } from 'shared/components/Button';
import { IconPencil, IconSettings } from '@tabler/icons-react';
import { Tag } from 'shared/components/Tag';

import profileBg from 'shared/assets/profile-bg.png';

import style from './ProfileCard.module.scss';
import { useContext, useState } from 'react';
import { Context } from 'main';
import { ProfileInfo } from './components/ProfileInfo';
import { observer } from 'mobx-react-lite';
import { ProfileEdit } from './components/ProfileEdit';
import { FormProvider, useForm } from 'react-hook-form';

export const ProfileCard = observer(() => {
  const { UStore } = useContext(Context);
  const profileForm = useForm({ mode: 'onSubmit', defaultValues: UStore.user });
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = profileForm.handleSubmit((formData) => {
    UStore.setUser(formData);
    setIsEdit(false);
  });

  return (
    <Card radius={32}>
      <Card.Section
        h={129}
        style={{
          backgroundImage: `url(${profileBg})`,
          backgroundSize: 'cover',
        }}
      />
      <Card.Section p={32}>
        <Stack gap={24}>
          <Flex justify={'space-between'}>
            <Avatar
              className={style.avatar}
              size={194}
              radius={32}
              mt={-97 - 32}
              src={UStore.user.avatar}
            />
            {isEdit ? (
              <Button
                disabled={
                  !profileForm.watch('grade') ||
                  !profileForm.watch('nickname') ||
                  !profileForm.watch('username')
                }
                onClick={onSubmit}
              >
                Сохранить изменения
              </Button>
            ) : (
              <Flex gap={8}>
                <Button outline>
                  <Flex gap={8}>
                    Настройки <IconSettings color="#ADB5BD" stroke={1.5} />
                  </Flex>
                </Button>
                <Button onClick={() => setIsEdit(true)} outline>
                  <Flex gap={8}>
                    Редактировать <IconPencil color="#ADB5BD" stroke={1.5} />
                  </Flex>
                </Button>
              </Flex>
            )}
          </Flex>
          {isEdit ? (
            <FormProvider {...profileForm}>
              <ProfileEdit />{' '}
            </FormProvider>
          ) : (
            <ProfileInfo {...UStore.user} />
          )}
        </Stack>
      </Card.Section>
    </Card>
  );
});
