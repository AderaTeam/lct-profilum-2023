import { Badge } from "@mantine/core";
import style from "./Tag.module.scss";

interface Props {
  text?: string;
  p?: string;
  center?: boolean;
  variant?: "outline" | "light" | "filled";
  children?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export const Tag = ({
  text,
  variant,
  children,
  onClick,
  color = "myColor",
}: Props) => {
  const isLink = onClick ? true : false;

  return (
    <Badge
      onClick={onClick}
      color={color}
      p={"6px 12px"}
      variant={variant}
      className={isLink ? style["hover-tag"] : style.tag}
    >
      {children ? children : text}
    </Badge>
  );
};
