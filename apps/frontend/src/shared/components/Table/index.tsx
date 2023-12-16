import { Loader, Modal, Stack } from '@mantine/core';
import { TableButtonRow } from './components/TableButtonRow';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import { useState } from 'react';
import FileDownload from 'js-file-download';
import $api from 'shared/api';
import { useDisclosure } from '@mantine/hooks';

interface TableProps {
  rowsData: any[];
  type: string;
}

export const Table = ({ rowsData, type }: TableProps) => {
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [openedInfo, setOpenInfo] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const allIds = rowsData.map((item) => `${item.id}`);

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ids = e.target.checked ? allIds : [];
    setActiveIds(ids);
  };

  const handleExport = async () => {
    console.log(activeIds);
    const response = await $api.post(
      '/process/export',
      { ids: activeIds },
      { responseType: 'blob' }
    );
    FileDownload(response.data, 'document.xlsx');
  };

  const handleRowDelete = (id: number) => {
    console.log('delete', id);
  };

  const handleRowEdit = (id: number) => {
    console.log('edit', id);
    setOpenInfo(true);
  };

  const handleModalOpen = (id: number) => {
    console.log('open', id);
    open();
  };

  return (
    <Stack gap={0}>
      {rowsData.length ? (
        <>
          <Stack
            style={{ borderRadius: '8px 8px 0 0', border: '1px solid #E9ECEF' }}
            gap={0}
          >
            <TableButtonRow handleExport={handleExport} />
            <TableHeader handleAllCheck={handleAllCheck} type={type} />
          </Stack>
          <Modal
            opened={openedInfo}
            onClose={() => setOpenInfo(false)}
            lockScroll={false}
            trapFocus={false}
            style={{ zIndex: 10000000, position: 'absolute' }}
            centered
            withCloseButton={false}
            padding={'32px'}
            size={600}
            radius={24}
          >
            <div>321</div>
          </Modal>
          <Modal
            size={508}
            lockScroll={false}
            trapFocus={false}
            style={{ zIndex: 10000000, position: 'absolute' }}
            withCloseButton={false}
            opened={opened}
            onClose={close}
            centered
            padding={'32px'}
            radius={24}
          >
            <div>123</div>
          </Modal>
          <TableBody
            handleRowDelete={handleRowDelete}
            handleRowEdit={handleRowEdit}
            handleModalOpen={handleModalOpen}
            setActiveIds={setActiveIds}
            activeIds={activeIds}
            type={type}
            rowsData={rowsData}
          />
        </>
      ) : (
        <Stack w={'100%'} h={'700px'} align="center" justify="center">
          <Loader color="myColor.5" size={'lg'} />
        </Stack>
      )}
    </Stack>
  );
};
