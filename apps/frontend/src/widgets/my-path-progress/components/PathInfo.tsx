import { Flex, Text } from '@mantine/core';
import { endingFormater } from 'shared/helpers/endingFormater';
import { IAnalazedResult } from 'shared/models/IAnalazedResult';
import { IPath } from 'shared/models/IPath';

interface PathInfoProps {
  activePath: IAnalazedResult | undefined;
  currentStep: number;
}

export const PathInfo = ({ activePath, currentStep }: PathInfoProps) => {
  const stepsCount = {
    complete: activePath?.path.pathSteps.filter(
      (item) => item.step < currentStep
    ).length,
    left: activePath?.path.pathSteps.filter((item) => item.step >= currentStep)
      .length,
  };

  return (
    <Flex gap={24}>
      <p className="text">
        Пройдено:{' '}
        <span className="text bold">
          {stepsCount.complete} {endingFormater(stepsCount?.complete!)}
        </span>
      </p>
      <p className="text">
        Осталось:{' '}
        <span className="text bold">
          {stepsCount.left} {endingFormater(stepsCount?.left!)}
        </span>
      </p>
    </Flex>
  );
};
