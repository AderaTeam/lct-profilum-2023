import { useEffect, useState } from 'react';
import $api from 'shared/api';
import { Table } from 'shared/components/Table';
import { IPath, IPathStep } from 'shared/models/IPath';

export const ProfDbTable = () => {
  const [rowsData, setRowsData] = useState<IPath[]>([]);

  useEffect(() => {
    $api.get<IPath[]>('/paths').then((response) => setRowsData(response.data));
  }, []);

  return <Table rowsData={rowsData} type={'prof'} />;
};
