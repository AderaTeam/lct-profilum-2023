import { Image, Text } from '@mantine/core';
import logo from 'shared/assets/logo.svg';
import style from './Navbar.module.scss';
import NavbarLinksGroup from './NavbarLinksGroup';
import { IconLogout } from '@tabler/icons-react';
import NavbarUser from './NavbarUser';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MY_PATH_ROUTE } from 'shared/constants/const';
import { useContext } from 'react';
import { Context } from 'main';

const Navbar = () => {
  const { UStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className={style.navbar}>
      <div className={style['navbar__header']}>
        <NavLink to={MY_PATH_ROUTE}>
          <Image src={logo} />
        </NavLink>
      </div>
      <div className={style['navbar__user']}>
        <NavbarUser />
      </div>
      <NavbarLinksGroup />
      <div className={style['navbar__footer']}>
        <div
          onClick={() => {
            UStore.logout();
            navigate(LOGIN_ROUTE);
          }}
          className={style['navbar__footer-link']}
        >
          <IconLogout />
          <Text lh={'24px'} size="md">
            Выйти
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
