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
}: Props) => {
  return (
    <MantineInput.Wrapper
      className={placeholder ? style['custom-input'] : style.input}
      label={label}
    >
      <MantineInput
        onFocus={onFocus}
        placeholder={placeholder}
        w={w}
        h={h}
        disabled={disabled}
        size={size}
        {...field}
        className={placeholder ? style['custom-input'] : style.input}
      />
    </MantineInput.Wrapper>
  );
};
