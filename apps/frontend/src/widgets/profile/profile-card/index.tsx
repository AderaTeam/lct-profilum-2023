import { Avatar, Card, Flex, Stack } from '@mantine/core';
import { Button } from 'shared/components/Button';
import { IconPencil, IconSettings } from '@tabler/icons-react';

import profileBg from 'shared/assets/profile-bg.png';

import rank0 from 'shared/assets/ranks/0.png';
import rank1 from 'shared/assets/ranks/1.png';
import rank2 from 'shared/assets/ranks/2.png';
import rank3 from 'shared/assets/ranks/3.png';
import rank4 from 'shared/assets/ranks/4.png';

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

  const rankImage: { [key: string]: string } = {
    Незнайка: rank0,
    'Маг-самоучка': rank1,
    'Первый шар': rank2,
    Волшебник: rank3,
    Оракул: rank4,
  };

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
              src={UStore.user.avatar || rankImage[UStore.user.rank]}
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
            <ProfileInfo rankImage={rankImage} user={UStore.user} />
          )}
        </Stack>
      </Card.Section>
    </Card>
  );
});
