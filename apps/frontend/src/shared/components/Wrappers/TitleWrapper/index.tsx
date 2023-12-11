import { useLocation } from "react-router-dom";
import { authRoutes } from "shared/constants/routes";
import { Title } from "@mantine/core";

import style from "./TitleWrapper.module.scss";

interface Props {
  title?: string;
}

const TitleWrapper = ({ title }: Props) => {
  const location = useLocation();
  const defaultTitle = authRoutes.find(
    (item) => item.path === location.pathname,
  )?.title!;

  return (
    <Title className={style.title} size={"h3"}>
      {title ? title : defaultTitle}
    </Title>
  );
};

export default TitleWrapper;
