import { Stack } from '@mantine/core';
import { UniversityCard } from './components/UniversityCard';
import { IUniversity } from 'shared/models/IUniversity';

interface EducationsUniversityProps {
  university: IUniversity[];
  handleSelectUnivercity: Function;
}

export const EducationsUniversity = ({
  university,
  handleSelectUnivercity,
}: EducationsUniversityProps) => {
  return (
    <Stack gap={48}>
      <Stack gap={12}>
        {university.map((item) => (
          <UniversityCard
            handleSelectUnivercity={handleSelectUnivercity}
            university={item}
            key={item.id}
          />
        ))}
      </Stack>
    </Stack>
  );
};
