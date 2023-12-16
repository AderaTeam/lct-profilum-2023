import { Checkbox, Stack } from '@mantine/core';
import { TableRow } from './TableRow';

interface TableBodyProps {
  rowsData: any[];
  type: string;
  activeIds: string[];
  setActiveIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleRowDelete: Function;
  handleRowEdit: Function;
  handleModalOpen: Function;
}

export const TableBody = ({
  rowsData,
  type,
  activeIds,
  setActiveIds,
  handleRowDelete,
  handleRowEdit,
  handleModalOpen,
}: TableBodyProps) => {
  return (
    <Stack gap={0}>
      <Checkbox.Group onChange={setActiveIds} value={activeIds}>
        {rowsData.map((item, index) => (
          <TableRow
            handleRowEdit={handleRowEdit}
            handleModalOpen={handleModalOpen}
            handleRowDelete={handleRowDelete}
            index={index + 1}
            type={type}
            row={item}
            key={item.id}
          />
        ))}
      </Checkbox.Group>
    </Stack>
  );
};
