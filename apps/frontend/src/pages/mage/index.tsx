import { Stack } from "@mantine/core";
import { Card } from "shared/components/Card";
import MainWrapper from "shared/components/Wrappers/MainWrapper";
import { MageChat } from "widgets/mage-chat";
import { MageProfile } from "widgets/mage-profile";

const MagePage = () => {
  return (
    <MainWrapper fullWidth>
      <Card w={1200} p="40px">
        <Stack align="center" gap={32}>
          <MageProfile />
          <MageChat />
        </Stack>
      </Card>
      <></>
    </MainWrapper>
  );
};

export default MagePage;
