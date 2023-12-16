import { Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ResultCard } from 'shared/components/ResultCard';

interface ResultListProps {
  activeIds: number[];
  setActiveIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ResultList = observer(
  ({ activeIds, setActiveIds }: ResultListProps) => {
    const { UStore } = useContext(Context);

    const handleChange = (id: number) => {
      if (activeIds.find((item) => item === id)) {
        setActiveIds((prevState) => prevState.filter((item) => item !== id));
      } else {
        setActiveIds((prevState) => [...prevState, id]);
      }
    };

    return (
      <Stack gap={12}>
        {UStore.user.analysedPaths?.map((item) => (
          <ResultCard
            descriptions={item.description}
            specialities={item.specialities}
            activeIds={activeIds}
            name={item.name}
            key={item.id}
            id={item.id}
            handleChange={handleChange}
          />
        ))}
      </Stack>
    );
  }
);
