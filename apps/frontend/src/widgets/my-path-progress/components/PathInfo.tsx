import { Flex, Text } from "@mantine/core";
import { endingFormater } from "shared/helpers/endingFormater";
import { IPath } from "shared/models/IPath";

interface PathInfoProps {
  activePath: IPath | undefined;
}

export const PathInfo = ({ activePath }: PathInfoProps) => {
  const stepsCount = {
    complete: activePath?.steps.filter((item) => item.status === "Завершено")
      .length,
    left: activePath?.steps.filter((item) => item.status !== "Завершено")
      .length,
  };

  return (
    <Flex gap={24}>
      <p className="text">
        Пройдено:{" "}
        <span className="text bold">
          {stepsCount.complete} {endingFormater(stepsCount?.complete!)}
        </span>
      </p>
      <p className="text">
        Осталось:{" "}
        <span className="text bold">
          {stepsCount.left} {endingFormater(stepsCount?.left!)}
        </span>
      </p>
    </Flex>
  );
};
