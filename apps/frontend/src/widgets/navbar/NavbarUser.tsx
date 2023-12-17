import { Avatar, Flex, Stack, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import { PROFILE_ROUTE } from 'shared/constants/const';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from 'main';

import rank0 from 'shared/assets/ranks/0.png';
import rank1 from 'shared/assets/ranks/1.png';
import rank2 from 'shared/assets/ranks/2.png';
import rank3 from 'shared/assets/ranks/3.png';
import rank4 from 'shared/assets/ranks/4.png';

import style from './Navbar.module.scss';

const NavbarUser = observer(() => {
  const { UStore } = useContext(Context);

  const rankImage: { [key: string]: string } = {
    Незнайка: rank0,
    'Маг-самоучка': rank1,
    'Первый шар': rank2,
    Волшебник: rank3,
    Оракул: rank4,
  };

  return (
    <Flex gap={12} align={'center'}>
      <Avatar
        src={
          UStore.user.image ||
          UStore.user.avataruri ||
          rankImage[UStore.user.rank]
        }
        h={56}
        w={56}
      />
      <Stack gap={6}>
        <Text className={style['navbar__name']}>{UStore.user.username}</Text>
        <Text className={style['navbar__tag']}>{UStore.user.nickname}</Text>
      </Stack>
      {UStore.user.role === 'user' ? (
        <div style={{ marginLeft: 'auto' }}>
          <NavLink to={PROFILE_ROUTE}>
            <IconChevronRight stroke={1.5} color="#ADB5BD" />
          </NavLink>
        </div>
      ) : (
        <></>
      )}
    </Flex>
  );
});

export default NavbarUser;
