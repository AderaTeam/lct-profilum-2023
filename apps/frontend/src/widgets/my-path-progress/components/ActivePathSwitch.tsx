import { Flex } from '@mantine/core';
import { Chip } from 'shared/components/Chip';
import { IAnalazedResult } from 'shared/models/IAnalazedResult';

interface ActivePathSwitchProps {
  paths: IAnalazedResult[];
  setActivePathId: React.Dispatch<React.SetStateAction<number>>;
  activePathId: number;
}

export const ActivePathSwitch = ({
  paths,
  activePathId,
  setActivePathId,
}: ActivePathSwitchProps) => {
  return (
    <Flex gap={12}>
      {paths.map((item) => (
        <Chip
          aciveId={activePathId}
          id={item.id}
          onClick={() => setActivePathId(item.id)}
          key={item.id}
          text={item.path.name}
        />
      ))}
    </Flex>
  );
};
