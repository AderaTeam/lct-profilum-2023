import { Stack } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { IPathStep } from "shared/models/IPath";

import style from "./PathSteps.module.scss";

export const StepProgressBar = (step: IPathStep) => {
  return (
    <Stack align="center" justify="center" gap={24} className={style.test}>
      <div
        style={{
          background:
            step.status === "Завершено" || step.status === "В процессе"
              ? "#FA1D80"
              : "#DEE2E6",
        }}
        className={style.line}
      ></div>
      <div>
        <IconCircleCheckFilled
          height={40}
          width={40}
          style={{ color: step.status === "Завершено" ? "#FA1D80" : "#DEE2E6" }}
        />
      </div>
      <div
        style={{
          background: step.status === "Завершено" ? "#FA1D80" : "#DEE2E6",
        }}
        className={style.line}
      ></div>
    </Stack>
  );
};
