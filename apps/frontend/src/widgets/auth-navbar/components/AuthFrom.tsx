import { Flex, Image, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import * as VKID from '@vkid/sdk';
import { Context } from 'main';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { Input } from 'shared/components/Input';
import { Select } from 'shared/components/Select';
import {
  LOGIN_ROUTE,
  NO_PAGE_ROUTE,
  ONBOARDING_ROUTE,
  REGISTRATION_ROUTE,
} from 'shared/constants/const';

import vk from 'shared/assets/vk.svg';

interface AuthFormProps {
  activeRole: number;
}

export const AuthForm = ({ activeRole }: AuthFormProps) => {
  const { UStore } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const { control, watch, setValue, getValues, handleSubmit } =
    useFormContext();
  VKID.Config.set({
    app: 51812541,
    redirectUrl: `https://profilum.adera-team.ru${NO_PAGE_ROUTE}`,
  });

  const selectData = [
    { label: '11 класс', value: '11 класс' },
    { label: '10 класс', value: '10 класс' },
    { label: '9 класс', value: '9 класс' },
    { label: '8 класс', value: '8 класс' },
  ];

  const onSubmit = handleSubmit((formData) => {
    if (location.pathname === LOGIN_ROUTE) {
      UStore.login(
        formData.nickname,
        formData.password,
        activeRole === 0 ? 'admin' : 'user'
      );
    } else {
      UStore.registration(
        formData.username,
        formData.nickname,
        formData.password,
        formData.grade,
        activeRole === 0 ? 'admin' : 'user'
      ).then(() => navigate(ONBOARDING_ROUTE));
    }
  });

  return (
    <Stack align="center" gap={24}>
      <Stack gap={12}>
        {location.pathname === LOGIN_ROUTE ? (
          <>
            {activeRole === 0 ? (
              <Flex
                p={'16px 24px'}
                style={{ borderRadius: '12px' }}
                bg={'#FFF0F7'}
                gap={16}
              >
                <Flex gap={8}>
                  <p className="text bold">Логин:</p>
                  <p className="text black">@admin</p>
                </Flex>
                <Flex gap={8}>
                  <p className="text bold">Пароль:</p>
                  <p className="text black">admin</p>
                </Flex>
              </Flex>
            ) : (
              <></>
            )}
            <Controller
              name="nickname"
              control={control}
              defaultValue={''}
              render={(field) => (
                <Input
                  label="Логин"
                  placeholder="@pavel"
                  {...field}
                  w={360}
                  h={43}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={''}
              render={(field) => (
                <Input
                  type="password"
                  label="Пароль"
                  placeholder="*******"
                  {...field}
                  w={360}
                  h={43}
                />
              )}
            />
          </>
        ) : (
          <>
            <Controller
              name="username"
              control={control}
              defaultValue={''}
              render={(field) => (
                <Input
                  label="Фамилия Имя"
                  placeholder="Иванов Иван"
                  {...field}
                  w={360}
                  h={43}
                />
              )}
            />
            <Controller
              name="nickname"
              control={control}
              defaultValue={''}
              render={(field) => (
                <Input
                  onFocus={
                    !getValues('nickname')
                      ? () => setValue('nickname', '@')
                      : undefined
                  }
                  placeholder="@krytoiperec"
                  label="Логин"
                  {...field}
                  w={360}
                  h={43}
                />
              )}
            />
            <Controller
              name="grade"
              control={control}
              defaultValue={''}
              render={(field) => (
                <Select
                  data={selectData}
                  label="Класс обучения"
                  placeholder="11 класс"
                  {...field}
                  w={360}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={''}
              render={(field) => (
                <Input
                  type="password"
                  label="Пароль"
                  placeholder="*******"
                  {...field}
                  w={360}
                  h={43}
                />
              )}
            />
          </>
        )}
      </Stack>
      <Stack w={'100%'} gap={12}>
        <Button
          onClick={onSubmit}
          disabled={
            location.pathname === LOGIN_ROUTE
              ? !watch('nickname') || !watch('password')
              : !watch('nickname') ||
                !watch('password') ||
                !watch('username') ||
                !watch('grade')
          }
          fullWidth
        >
          <Flex align={'center'} gap={8}>
            {location.pathname === LOGIN_ROUTE ? 'Войти' : 'Зарегестрироваться'}
            <IconChevronRight stroke={1.5} color="#FFFF" />
          </Flex>
        </Button>
        {activeRole === 1 ? (
          <Flex style={{ margin: '0 auto' }} gap={4}>
            {location.pathname === LOGIN_ROUTE ? (
              <>
                <p className="text black">Нет аккаунта?</p>
                <NavLink to={REGISTRATION_ROUTE}>
                  <p className="text pink">Зарегистрироваться</p>
                </NavLink>
              </>
            ) : (
              <>
                <p className="text black">Есть аккаунт?</p>
                <NavLink to={LOGIN_ROUTE}>
                  <p className="text pink">Войти</p>
                </NavLink>
              </>
            )}
          </Flex>
        ) : (
          <></>
        )}
      </Stack>
      {activeRole === 1 ? (
        <Stack gap={40} mt={8}>
          <p style={{ margin: '0 auto' }} className="text gray">
            или
          </p>
          <Button onClick={() => VKID.Auth.login()} color="#0077ff">
            <Flex align={'center'} gap={8}>
              <Image src={vk} w={24} h={24} />
              Войти через ВКонтакте
            </Flex>
          </Button>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};
