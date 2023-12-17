import { useEffect, useState } from 'react';
import $api from 'shared/api';
import { Table } from 'shared/components/Table';
import { IPath, IPathStep } from 'shared/models/IPath';

export const PathDbTable = () => {
  const [rowsData, setRowsData] = useState<
    { id: number; name: string; pathSteps: IPathStep[] }[]
  >([]);

  const getPaths = () => {
    $api.get<IPath[]>('/paths').then((response) => setRowsData(response.data));
  };

  useEffect(() => {
    getPaths();
  }, []);

  return <Table getPaths={getPaths} rowsData={rowsData} type={'path'} />;
};
