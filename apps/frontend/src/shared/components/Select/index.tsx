import { Select as MantineSelect } from "@mantine/core";
import style from "./Select.module.scss";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { IResult } from "shared/models/IResult";

interface Props {
  data: { label: string; value: string }[];
  field:
    | ControllerRenderProps<IResult, any>
    | ControllerRenderProps<FieldValues, any>;
  custom?: boolean;
  label?: string;
  placeholder?: string;
}

export const Select = ({ data, field, custom, label, placeholder }: Props) => {
  return (
    <MantineSelect
      {...field}
      label={label}
      placeholder={placeholder}
      data={data}
      className={custom ? style.custom : style.select}
      searchable
    />
  );
};
