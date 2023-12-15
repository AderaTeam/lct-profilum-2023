import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { OnboardingChat } from 'widgets/onboarding-chat';

const OnboardingPage = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      <MainWrapper fullWidth>
        <OnboardingChat />
        <></>
      </MainWrapper>
    </div>
  );
};

export default OnboardingPage;
