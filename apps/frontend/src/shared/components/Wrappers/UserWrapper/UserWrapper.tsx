import { ActionIcon, Flex, Stack, Title } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { authRoutes } from "shared/constants/routes";
import { IconChevronLeft } from "@tabler/icons-react";
import TitleWrapper from "../TitleWrapper";
import style from "./UserWrapper.module.scss";

type Props = {
  children?: React.ReactNode;
  CustomTitle?: () => JSX.Element;
};

const UserWrapper = ({ children, CustomTitle }: Props) => {
  const location = useLocation();
  const title = authRoutes.find((item) => item.path === location.pathname)
    ?.title!;
  const navigate = useNavigate();

  return (
    <Stack bg={"gray.0"} className={style.container} p={"48px 0px"} gap={40}>
      <Flex gap={24}>
        {title === "Тестирование" && (
          <ActionIcon
            radius={"1rem"}
            style={{ background: "white" }}
            w={56}
            h={56}
            onClick={() => navigate(-1)}
          >
            <IconChevronLeft
              color="#1C1C1C"
              stroke={1.5}
              width={24}
              height={24}
            />
          </ActionIcon>
        )}
        {CustomTitle ? <CustomTitle /> : <TitleWrapper />}
      </Flex>
      {children}
    </Stack>
  );
};

export default UserWrapper;
