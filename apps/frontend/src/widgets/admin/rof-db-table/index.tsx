import { useEffect, useState } from 'react';
import $api from 'shared/api';
import { Table } from 'shared/components/Table';
import { IPath } from 'shared/models/IPath';

export const ProfDbTable = () => {
  const [rowsData, setRowsData] = useState<IPath[]>([]);

  const getPaths = () => {
    $api.get<IPath[]>('/paths').then((response) => setRowsData(response.data));
  };

  useEffect(() => {
    getPaths();
  }, []);

  return <Table getPaths={getPaths} rowsData={rowsData} type={'prof'} />;
};
