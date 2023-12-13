import { Flex, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Context } from 'main';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { Input } from 'shared/components/Input';
import { Select } from 'shared/components/Select';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from 'shared/constants/const';

interface AuthFormProps {
  activeRole: number;
}

export const AuthForm = ({ activeRole }: AuthFormProps) => {
  const { UStore } = useContext(Context);
  const location = useLocation();
  const { control, watch, setValue, getValues, handleSubmit } =
    useFormContext();

  const selectData = [
    { label: '11 класс', value: '11 класс' },
    { label: '10 класс', value: '10 класс' },
    { label: '9 класс', value: '9 класс' },
    { label: '8 класс', value: '8 класс' },
  ];

  const onSubmit = handleSubmit((formData) => {
    if (location.pathname === LOGIN_ROUTE) {
      UStore.setUser({ ...UStore.user, ...formData });
      UStore.setAuth(true);
    } else {
      UStore.setUser({ ...UStore.user, ...formData });
      UStore.setAuth(true);
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
        <Flex gap={4}>
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
  );
};
