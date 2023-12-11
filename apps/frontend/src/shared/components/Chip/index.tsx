import style from "./Chip.module.scss";

interface Props {
  text?: string;
  children?: React.ReactNode;
  color?: string;
  aciveId?: number;
  id?: number;
  onClick?: () => void;
}

export const Chip = ({ text, children, onClick, id, aciveId }: Props) => {
  return (
    <div
      className={style.chip}
      style={id === aciveId ? { background: "#FA1D80", color: "white" } : {}}
      onClick={onClick}
      color={"dark"}
    >
      {children ? children : text}
    </div>
  );
};
