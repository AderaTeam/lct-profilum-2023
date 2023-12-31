import { Stack } from '@mantine/core';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { ProfileAchievement } from 'widgets/profile/profile-achievement';
import { ProfileCard } from 'widgets/profile/profile-card';
import { ProfileEvents } from 'widgets/profile/profile-events';

const ProfilePage = () => {
  return (
    <MainWrapper isHideTitle>
      <Stack gap={48}>
        <Stack gap={12}>
          <ProfileCard />
          <ProfileAchievement />
        </Stack>
        <ProfileEvents />
      </Stack>
      <Stack gap={16}></Stack>
    </MainWrapper>
  );
};

export default ProfilePage;
