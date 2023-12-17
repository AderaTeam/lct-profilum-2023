import { Stack } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { IPathStep } from 'shared/models/IPath';

import style from './PathSteps.module.scss';

interface StepProgressBarProps {
  step: IPathStep;
  currentStep: number;
}

export const StepProgressBar = ({
  step,
  currentStep,
}: StepProgressBarProps) => {
  return (
    <Stack
      align="center"
      justify="center"
      style={{ height: '100%' }}
      gap={24}
      className={style.test}
    >
      <div
        style={{
          background: step.step <= currentStep ? '#FA1D80' : '#DEE2E6',
        }}
        className={style.line}
      ></div>
      <div>
        <IconCircleCheckFilled
          height={40}
          width={40}
          style={{ color: currentStep > step.step ? '#FA1D80' : '#DEE2E6' }}
        />
      </div>
      <div
        style={{
          background: currentStep > step.step ? '#FA1D80' : '#DEE2E6',
        }}
        className={style.line}
      ></div>
    </Stack>
  );
};
