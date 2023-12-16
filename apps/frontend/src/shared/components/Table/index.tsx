import { Loader, Stack } from '@mantine/core';
import { TableButtonRow } from './components/TableButtonRow';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';

interface TableProps {
  rowsData: any[];
  type: string;
}

export const Table = ({ rowsData, type }: TableProps) => {
  return (
    <Stack gap={0}>
      {rowsData.length ? (
        <>
          <Stack
            style={{ borderRadius: '8px 8px 0 0', border: '1px solid #E9ECEF' }}
            gap={0}
          >
            <TableButtonRow />
            <TableHeader type={type} />
          </Stack>
          <TableBody type={type} rowsData={rowsData} />
        </>
      ) : (
        <Stack w={'100%'} h={'700px'} align="center" justify="center">
          <Loader color="myColor.5" size={'lg'} />
        </Stack>
      )}
    </Stack>
  );
};
