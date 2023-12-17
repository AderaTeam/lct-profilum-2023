import { Flex, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { IPath } from 'shared/models/IPath';

interface ModalInfoProps {
  type: string;
  activeRow: IPath | undefined;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalInfo = ({ activeRow, type, close }: ModalInfoProps) => {
  return (
    <Stack w={'100%'} gap={32}>
      <Flex justify={'center'} w={'100%'}>
        <h3 className="h3">{activeRow?.name}</h3>
        <IconPlus
          onClick={() => close(false)}
          style={{ rotate: '45deg', marginLeft: 'auto', cursor: 'pointer' }}
          stroke={1.5}
          color="#ADB5BD"
        />
      </Flex>
      <Stack gap={16}>
        <Stack gap={4}>
          <p className="text gray">Описание</p>
          <p className="text black">{activeRow?.description}</p>
        </Stack>
        <Stack gap={4}>
          <p className="text gray">Специальности</p>
          <Flex gap={4} wrap={'wrap'}>
            {activeRow?.specialities.map((item, index) => (
              <p key={index} className="text black">
                #{item.name}
                {activeRow.specialities[index + 1] ? ',' : ''}
              </p>
            ))}
          </Flex>
        </Stack>
        <Stack gap={4}>
          <p className="text gray">Количество шагов</p>
          <p className="text black">{activeRow?.pathSteps.length}</p>
        </Stack>
      </Stack>
    </Stack>
  );
};
