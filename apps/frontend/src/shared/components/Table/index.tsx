import { Stack } from '@mantine/core';
import { TableButtonRow } from './components/TableButtonRow';

export const Table = () => {
  return (
    <Stack gap={0}>
      <Stack
        p={'24px 0'}
        style={{ borderRadius: '8px', border: '1px solid #E9ECEF' }}
        gap={0}
      >
        <TableButtonRow />
      </Stack>
    </Stack>
  );
};
