import { Stack, Text } from "@mantine/core";
import { IPathStepContent } from "shared/models/IPath";

import style from "./PathSteps.module.scss";
import { endingFormater } from "shared/helpers/endingFormater";

export const Content = (content: IPathStepContent) => {
  return (
    <Stack gap={16}>
      {content.link && (
        <Stack gap={6}>
          <Text className={style["content-title"]}>Ссылка на видео:</Text>
          <a target="_blank" href={content.link}>
            <Text
              style={{ textDecoration: "underline" }}
              className={style["content-text"]}
            >
              {content.link}
            </Text>
          </a>
        </Stack>
      )}
      {content.text && (
        <Stack gap={6}>
          <Text className={style["content-title"]}>Дополнительно:</Text>
          <Text className={style["content-text"]}>{content.text}</Text>
        </Stack>
      )}
      {content.questionsCount && (
        <Stack gap={6}>
          <Text className={style["content-title"]}>
            Подтверждение завершения:
          </Text>
          <Text className={style["content-text"]}>
            {content.questionsCount}{" "}
            {endingFormater(content.questionsCount, true)}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
