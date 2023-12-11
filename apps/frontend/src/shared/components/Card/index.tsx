import { Stack } from "@mantine/core";
import style from "./Card.module.scss";

interface Props {
  p?: string;
  spasing?: number;
  children?: React.ReactNode;
  w?: number | string;
  h?: number | string;
  mt?: number;
  mb?: number;
  bg?: string;
  radius?: string;
  outline?: boolean;
}

export const Card = ({
  p = "32px",
  spasing = 16,
  children,
  w,
  h,
  mt,
  mb,
  bg = "#FFFF",
  radius,
  outline,
}: Props) => {
  return (
    <Stack
      mt={mt}
      mb={mb}
      p={p}
      gap={spasing}
      bg={bg}
      w={w}
      h={h}
      style={{
        borderRadius: `${radius}`,
        border: outline ? "2px solid #DEE2E6" : "none",
      }}
      className={style.card}
    >
      {children}
    </Stack>
  );
};
