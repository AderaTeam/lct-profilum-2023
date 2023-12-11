import { Flex } from "@mantine/core";
import { Chip } from "shared/components/Chip";
import { IPath } from "shared/models/IPath";

interface ActivePathSwitchProps {
  path: IPath[];
  setActivePathId: React.Dispatch<React.SetStateAction<number>>;
  activePathId: number;
}

export const ActivePathSwitch = ({
  path,
  activePathId,
  setActivePathId,
}: ActivePathSwitchProps) => {
  return (
    <Flex gap={12}>
      {path.map((item) => (
        <Chip
          aciveId={activePathId}
          id={item.id}
          onClick={() => setActivePathId(item.id)}
          key={item.id}
          text={item.name}
        />
      ))}
    </Flex>
  );
};
