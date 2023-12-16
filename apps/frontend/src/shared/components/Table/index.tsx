import { Stack } from '@mantine/core';
import { TableButtonRow } from './components/TableButtonRow';
import { TableHeader } from './components/TableHeader';

interface TableProps {
  rowsData: any[];
  type: string;
}

export const Table = ({ rowsData, type }: TableProps) => {
  return (
    <Stack gap={0}>
      <Stack
        style={{ borderRadius: '8px', border: '1px solid #E9ECEF' }}
        gap={0}
      >
        <TableButtonRow />
        <TableHeader />
      </Stack>
    </Stack>
  );
};
