import { Stack } from '@mantine/core';
import { TableRow } from './TableRow';

interface TableBodyProps {
  rowsData: any[];
  type: string;
}

export const TableBody = ({ rowsData, type }: TableBodyProps) => {
  return (
    <Stack gap={0}>
      {rowsData.map((item, index) => (
        <TableRow index={index + 1} type={type} row={item} key={item.id} />
      ))}
    </Stack>
  );
};
