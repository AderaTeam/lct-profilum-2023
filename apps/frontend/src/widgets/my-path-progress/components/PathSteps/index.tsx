import { IPath } from "shared/models/IPath";
import { Stack } from "@mantine/core";
import { Step } from "./Step";

interface PathStepsProps {
  activePath: IPath | undefined;
  handleStepComplete: Function;
}

export const PathSteps = ({
  activePath,
  handleStepComplete,
}: PathStepsProps) => {
  return (
    <Stack gap={0}>
      {activePath?.steps?.length &&
        activePath.steps.map((step) => (
          <Step
            key={step.step}
            handleStepComplete={handleStepComplete}
            step={step}
          />
        ))}
    </Stack>
  );
};
