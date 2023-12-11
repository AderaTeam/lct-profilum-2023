import { FileInput as MantineFileInput } from "@mantine/core";
import style from "./FileInput.module.scss";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Props {
  field: ControllerRenderProps<FieldValues, "file">;
  disabled?: boolean;
}

export const FileInput = ({ disabled, field }: Props) => {
  return (
    <MantineFileInput
      clearable
      {...field}
      disabled={disabled}
      label="Загрузка"
      placeholder="Выберите файл"
      className={style.input}
    />
  );
};
