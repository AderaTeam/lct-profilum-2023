import { Image, Text } from "@mantine/core";
import logo from "shared/assets/logo.svg";
import style from "./Navbar.module.scss";
import NavbarLinksGroup from "./NavbarLinksGroup";
import { IconLogout } from "@tabler/icons-react";
import NavbarUser from "./NavbarUser";
import { NavLink } from "react-router-dom";
import { MY_PATH_ROUTE } from "shared/constants/const";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={style["navbar__header"]}>
        <NavLink to={MY_PATH_ROUTE}>
          <Image src={logo} />
        </NavLink>
      </div>
      <div className={style["navbar__user"]}>
        <NavbarUser />
      </div>
      <NavbarLinksGroup />
      <div className={style["navbar__footer"]}>
        <div className={style["navbar__footer-link"]}>
          <IconLogout />
          <Text lh={"24px"} size="md">
            Выйти
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
