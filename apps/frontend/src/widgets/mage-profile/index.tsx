import { Image, Stack } from "@mantine/core";

import mage from "shared/assets/analyse-mage.png";
import { Tag } from "shared/components/Tag";

export const MageProfile = () => {
  return (
    <Stack align="center" gap={24}>
      <Image radius={24} src={mage} w={145} h={145} />
      <Stack align="center" gap={12}>
        <h1 className="h1">Профилум</h1>
        <Tag variant="outline" text="Оракул со 100 летним стажем" />
      </Stack>
    </Stack>
  );
};
