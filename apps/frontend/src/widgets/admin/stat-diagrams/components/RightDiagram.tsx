import { Stack } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { rightData } from 'shared/constants/rightData';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
ChartJS.defaults.scale.grid.display = false;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const RightDiagram = () => {
  const { watch } = useFormContext();
  const [diagramData, setDiagramData] = useState<{
    label?: string[] | undefined;
    value?: number[] | undefined;
  }>();

  useEffect(() => {
    if (watch('rightFilter')) {
      const label = rightData[watch('rightFilter')].map((item) => item.label);
      const value = rightData[watch('rightFilter')].map((item) => +item.value);
      setDiagramData({ label: label, value: value });
    }
  }, [watch('rightFilter')]);

  const data = {
    labels: diagramData?.label,
    datasets: [
      {
        label: watch('rightFilter'),
        data: diagramData?.value,
        backgroundColor: '#2F80ED',
        borderRadius: 16,
      },
    ],
  };

  return (
    <Stack gap={24}>
      <h3 className="h3">Статистика по специальностям</h3>
      <Bar data={data} />
    </Stack>
  );
};
