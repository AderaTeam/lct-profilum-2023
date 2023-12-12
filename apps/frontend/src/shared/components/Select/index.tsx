import { Select as MantineSelect } from '@mantine/core';
import style from './Select.module.scss';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface Props {
  data: { label: string; value: string }[];
  field: ControllerRenderProps<FieldValues, any>;
  custom?: boolean;
  label?: string;
  placeholder?: string;
  w?: number;
}

export const Select = ({
  data,
  field,
  custom,
  label,
  placeholder,
  w,
}: Props) => {
  return (
    <MantineSelect
      {...field}
      w={w}
      label={label}
      placeholder={placeholder}
      data={data}
      className={custom ? style.custom : style.select}
      searchable
    />
  );
};
