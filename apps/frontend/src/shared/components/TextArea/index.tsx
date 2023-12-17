import { Textarea } from '@mantine/core';
import style from './TextArea.module.scss';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface Props {
  field: ControllerRenderProps<FieldValues, any>;
  disabled?: boolean;
  h?: number;
  label?: string;
  placeholder?: string;
  custom?: boolean;
}

export const TextArea = ({
  field,
  disabled,
  label,
  placeholder,
  custom,
}: Props) => {
  return (
    <Textarea
      {...field}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      className={custom ? style['custom-textarea'] : style.textarea}
      variant="filled"
    />
  );
};
