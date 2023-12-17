import { Flex, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { Card } from 'shared/components/Card';
import { MY_PATH_ROUTE } from 'shared/constants/const';
import { MageProfile } from 'widgets/mage-profile';
import { ChatBlock } from './components/ChatBlock';

export const OnboardingChat = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step > 1) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [step]);

  return (
    <Card radius="32px" w={700} p={'40px'}>
      <Stack gap={32}>
        <MageProfile isOnboarding step={step} />
        <ChatBlock step={step} isLoading={isLoading} />
        <Flex justify={'space-between'}>
          <Button
            onClick={() => navigate(MY_PATH_ROUTE)}
            outline
            title="Пропустить обучение"
          />
          <Button
            onClick={
              step === 4
                ? () => navigate(MY_PATH_ROUTE)
                : () => setStep(step + 1)
            }
          >
            <Flex gap={8}>
              {step === 4 ? 'Начать' : 'Да, хочу!'}
              <IconChevronRight stroke={1.5} color="#ffff" />
            </Flex>
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
};
