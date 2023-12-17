import { Flex, Image, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon } from 'shared/components/ActionIcon';
import { Tag } from 'shared/components/Tag';

import mageAvatar from 'shared/assets/mage.png';
import { MY_PATH_ROUTE } from 'shared/constants/const';

interface MageProfile {
  step?: number;
  isOnboarding?: boolean;
}

export const MageProfile = ({ step, isOnboarding }: MageProfile) => {
  const navigate = useNavigate();

  return (
    <Stack align="center" gap={24}>
      {step ? (
        <div style={{ position: 'absolute', left: 40, top: 40 }}>
          <h2 className="h2">
            {step} <span className="h2 text gray">/4</span>
          </h2>
        </div>
      ) : (
        <></>
      )}
      <Image
        decoding="async"
        loading="lazy"
        radius={24}
        src={mageAvatar}
        w={180}
        h={180}
        style={{
          backgroundSize: 'cover',
          backgroundImage: `${mageAvatar}`,
        }}
      />
      <div style={{ position: 'absolute', right: 40, top: 40 }}>
        <ActionIcon
          onClick={
            isOnboarding ? () => navigate(MY_PATH_ROUTE) : () => navigate(-1)
          }
          outline
        >
          <IconPlus style={{ rotate: '45deg' }} stroke={1.5} color="#ADB5BD" />
        </ActionIcon>
      </div>
      <Stack align="center" gap={12}>
        <Flex>
          <h1 className="h1">Профилум</h1>
        </Flex>
        <Tag variant="outline" text="Лучший выпускник академии оракулов" />
      </Stack>
    </Stack>
  );
};
