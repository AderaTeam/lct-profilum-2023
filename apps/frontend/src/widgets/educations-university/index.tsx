import { Stack } from '@mantine/core';
import { UniversityCard } from './components/UniversityCard';
import { IUniversity } from 'shared/models/IUniversity';

interface EducationsUniversityProps {
  university: IUniversity[];
}

export const EducationsUniversity = ({
  university,
}: EducationsUniversityProps) => {
  return (
    <Stack gap={48}>
      <Stack gap={12}>
        {university.map((item) => (
          <UniversityCard university={item} key={item.name} />
        ))}
      </Stack>
    </Stack>
  );
};
