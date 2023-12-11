import { Input as MantineInput } from "@mantine/core";
import style from "./Input.module.scss";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { IResult } from "shared/models/IResult";
import { Icon123, IconSearch } from "@tabler/icons-react";

interface Props {
  field:
    | ControllerRenderProps<IResult, any>
    | ControllerRenderProps<FieldValues, any>;
  w?: number;
  size?: string;
  h?: number;
  placeholder?: string;
  br?: string;
  disabled?: boolean;
}

export const Input = ({
  field,
  w,
  h,
  size,
  placeholder,
  br,
  disabled,
}: Props) => {
  return (
    <MantineInput
      placeholder={placeholder}
      rightSection={
        placeholder && (
          <IconSearch
            opacity={0.3}
            style={{ marginBottom: "4px" }}
            width={24}
            height={24}
          />
        )
      }
      w={w}
      h={h}
      disabled={disabled}
      style={{ borderRadius: br }}
      size={size}
      {...field}
      className={placeholder ? style["custom-input"] : style.input}
    />
  );
};
