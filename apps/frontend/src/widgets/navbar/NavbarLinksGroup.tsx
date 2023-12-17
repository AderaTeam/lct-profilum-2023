import { Flex, Stack, Text } from '@mantine/core';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { authRoutes } from 'shared/constants/routes';

import style from './Navbar.module.scss';

interface LinksProps {
  icon?: React.FC<any>;
  path: string;
  title: string;
  Component: FC<{}>;
  isHide?: boolean;
}

interface NavbarLinksGroupProps {
  role: string;
}

const NavbarLink = ({ icon: Icon, path, title }: LinksProps) => {
  return (
    <NavLink to={path}>
      <Flex className={style['navbar__link']} align="center" gap={12}>
        {Icon && <Icon stroke="1.5" />}
        <Text lh={'24px'} size="md">
          {title === 'Виды анализа' ? 'Прогнозирование' : title}
        </Text>
      </Flex>
    </NavLink>
  );
};

const NavbarLinksGroup = ({ role }: NavbarLinksGroupProps) => {
  const links =
    role === 'user'
      ? authRoutes
          .filter((item) => item.isAdmin) //!
          .map((link) => {
            if (!link?.isHide) {
              return <NavbarLink {...link} key={link.title} />;
            }
          })
      : authRoutes
          .filter((item) => !item.isAdmin) //
          .map((link) => {
            if (!link?.isHide) {
              return <NavbarLink {...link} key={link.title} />;
            }
          });

  return (
    <nav style={{ flex: 1 }} id="nav">
      <Stack gap={4}>{links}</Stack>
    </nav>
  );
};

export default NavbarLinksGroup;
