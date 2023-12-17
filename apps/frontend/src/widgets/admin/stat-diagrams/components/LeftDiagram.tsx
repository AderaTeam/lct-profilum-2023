import { Stack } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useFormContext } from 'react-hook-form';
import { lefttData } from 'shared/constants/leftData';

export const LeftDiagram = () => {
  const { watch } = useFormContext();
  const [diagramData, setDiagramData] = useState<{
    label?: string[] | undefined;
    value?: number[] | undefined;
  }>();

  useEffect(() => {
    if (watch('leftFilter')) {
      const label = lefttData[watch('leftFilter')].map((item) => item.label);
      const value = lefttData[watch('leftFilter')].map((item) => +item.value);
      setDiagramData({ label: label, value: value });
    }
  }, [watch('leftFilter')]);

  const data = {
    labels: diagramData?.label,
    datasets: [
      {
        label: watch('leftFilter'),
        data: diagramData?.value,
        backgroundColor: '#FA1D80',
        borderRadius: 16,
      },
    ],
  };

  return (
    <Stack gap={24}>
      <h3 className="h3">Общая информация</h3>
      <Bar data={data} />
    </Stack>
  );
};
