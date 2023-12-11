import { Checkbox as MantineCheckbox } from '@mantine/core';
import style from './Checkbox.module.scss';

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const Checkbox = ({ onChange, value }: Props) => {
  return (
    <MantineCheckbox
      value={value}
      onChange={onChange}
      color="grape.5"
      className={style.checkbox}
    />
  );
};
