import { Stack } from "@mantine/core";
import MainWrapper from "shared/components/Wrappers/MainWrapper";
import { ProfileAchievement } from "widgets/profile/profile-achievement";
import { ProfileCard } from "widgets/profile/profile-card";

const ProfilePage = () => {
  return (
    <MainWrapper isHideTitle>
      <Stack gap={12}>
        <ProfileCard />
        <ProfileAchievement />
      </Stack>
      <Stack gap={16}></Stack>
    </MainWrapper>
  );
};

export default ProfilePage;
