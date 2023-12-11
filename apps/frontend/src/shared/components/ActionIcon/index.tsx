import { ActionIcon as MantineActionIcon } from "@mantine/core";

import style from "./ActionIcon.module.scss";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  outline?: boolean;
}

export const ActionIcon = ({
  color = "gray",
  outline,
  children,
  onClick,
  disabled,
}: Props) => {
  return (
    <MantineActionIcon
      onClick={onClick}
      color={color}
      variant={outline ? "outline" : "filled"}
      disabled={disabled}
      className={style.button}
    >
      {children}
    </MantineActionIcon>
  );
};
