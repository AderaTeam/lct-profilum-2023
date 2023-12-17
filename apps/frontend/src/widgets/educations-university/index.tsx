import { Stack } from '@mantine/core';
import { UniversityCard } from './components/UniversityCard';
import { IUniversity } from 'shared/models/IUniversity';

interface EducationsUniversityProps {
  university: IUniversity[];
  handleSelectUniversity: Function;
  handleDeleteUniversity: Function;
  selectedIds: number[];
}

export const EducationsUniversity = ({
  university,
  handleSelectUniversity,
  handleDeleteUniversity,
  selectedIds,
}: EducationsUniversityProps) => {
  return (
    <Stack gap={48}>
      <Stack gap={12}>
        {university.map((item) => (
          <UniversityCard
            selectedIds={selectedIds}
            handleDeleteUniversity={handleDeleteUniversity}
            handleSelectUnivercity={handleSelectUniversity}
            university={item}
            key={item.id}
          />
        ))}
      </Stack>
    </Stack>
  );
};
