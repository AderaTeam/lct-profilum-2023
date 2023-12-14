import { Flex, Image, Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { IUniversity } from 'shared/models/IUniversity';
import { UniversityInfo } from './UniversityInfo';
import { Tag } from 'shared/components/Tag';
import { Button } from 'shared/components/Button';
import { IconPlus } from '@tabler/icons-react';

interface UniversityCardProps {
  university: IUniversity;
}

export const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <Flex gap={0}>
      <Image w={220} radius={'24px 0 0 24px'} src={university.image} />
      <Card w={'100%'} radius="0 24px 24px 0">
        <Stack gap={24}>
          <h2 className="h2">{university.name}</h2>
          <UniversityInfo
            city={university.city}
            budgetPlaces={university.budgetPlaces}
            popularity={university.popularity}
            students={university.students}
          />
          <Flex gap={8} wrap={'wrap'}>
            {university.tags.map((item, index) => (
              <Tag
                key={item}
                variant={index === 0 ? 'filled' : 'light'}
                text={item}
              />
            ))}
          </Flex>
          <Button outline>
            <Flex gap={8}>
              Добавить в мой ТОП-3 <IconPlus stroke={1.5} color="#ADB5BD" />
            </Flex>
          </Button>
        </Stack>
      </Card>
    </Flex>
  );
};
