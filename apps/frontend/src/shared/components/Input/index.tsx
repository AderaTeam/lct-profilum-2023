import { Input as MantineInput } from '@mantine/core';
import style from './Input.module.scss';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Icon123, IconSearch } from '@tabler/icons-react';

interface Props {
  field: ControllerRenderProps<FieldValues, any>;
  w?: number;
  size?: string;
  h?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  type?: string;
}

export const Input = ({
  field,
  w,
  h,
  size,
  placeholder,
  disabled,
  label,
  onFocus,
  type,
}: Props) => {
  return (
    <MantineInput.Wrapper className={style.input} label={label}>
      <MantineInput
        type={type}
        onFocus={onFocus}
        placeholder={placeholder}
        w={w}
        h={h}
        disabled={disabled}
        size={size}
        {...field}
        className={style.input}
      />
    </MantineInput.Wrapper>
  );
};
