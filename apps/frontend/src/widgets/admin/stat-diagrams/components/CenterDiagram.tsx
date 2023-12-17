import { Stack } from '@mantine/core';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
  LineElement,
} from 'chart.js';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useFormContext } from 'react-hook-form';
import { lefttData } from 'shared/constants/leftData';
ChartJS.defaults.scale.grid.display = false;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const CenterDiagram = () => {
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
        borderColor: '#FA1D80',
        borderRadius: 16,
      },
    ],
  };

  return (
    <Stack gap={24}>
      <h3 className="h3">Общая информация</h3>
      <Line data={data} />
    </Stack>
  );
};
