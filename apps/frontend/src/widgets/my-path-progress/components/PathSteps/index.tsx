import { IPath } from 'shared/models/IPath';
import { Stack } from '@mantine/core';
import { Step } from './Step';
import { IAnalazedResult } from 'shared/models/IAnalazedResult';

interface PathStepsProps {
  activePath: IAnalazedResult | undefined;
  handleStepComplete: Function;
}

export const PathSteps = ({
  activePath,
  handleStepComplete,
}: PathStepsProps) => {
  return (
    <Stack gap={0}>
      {activePath?.path.pathSteps?.length &&
        activePath.path.pathSteps?.map((step) => (
          <Step
            currentStep={activePath.currentStep}
            key={step.step}
            handleStepComplete={handleStepComplete}
            step={step}
          />
        ))}
    </Stack>
  );
};
