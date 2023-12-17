import style from './Chip.module.scss';

interface Props {
  text?: string;
  children?: React.ReactNode;
  color?: string;
  aciveId?: number | string;
  activeIds?: number[];
  id?: number | string;
  onClick?: () => void;
}

export const Chip = ({
  text,
  children,
  onClick,
  id,
  aciveId,
  activeIds,
}: Props) => {
  return (
    <div
      className={style.chip}
      style={
        id === aciveId || activeIds?.find((item) => item === id)
          ? { background: '#FA1D80', color: 'white' }
          : {}
      }
      onClick={onClick}
      color={'dark'}
    >
      {children ? children : text}
    </div>
  );
};
