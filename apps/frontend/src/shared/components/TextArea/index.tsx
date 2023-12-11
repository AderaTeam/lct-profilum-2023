import { Textarea } from "@mantine/core"
import style from './TextArea.module.scss';
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Props {
  field: ControllerRenderProps<FieldValues, "text">,
  disabled?: boolean, 
}

export const TextArea = ({field, disabled}: Props) => {

  return (
    <Textarea
      {...field}
      disabled={disabled}
      label="Ввод"
      placeholder="Введите или вставьте текст обращения"
      className={style.textarea}
      variant="filled"
    />
  )
}