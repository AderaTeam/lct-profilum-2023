import { Flex, Stack } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Button } from "shared/components/Button";
import { Card } from "shared/components/Card";

export const ProgressCard = () => {
  return (
    <Card spasing={24}>
      <Stack gap={24}>
        <h2 className="h2">Мой прогресс</h2>
        <Button fullWidth outline>
          <Flex w={"100%"} justify={"space-between"}>
            К заданию <IconChevronRight stroke={1.5} color="#ADB5BD" />
          </Flex>
        </Button>
      </Stack>
    </Card>
  );
};
