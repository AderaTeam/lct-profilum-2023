import { SegmentedControl } from "@mantine/core";
import style from './Segment.module.scss';

interface Props {
  data?: string[];
}

export const Segment = ({data}: Props) => {
  return (
    <SegmentedControl
      className={style.segment}
      data={data || []}
      size="xl"
      radius={16}
    />
  );
}