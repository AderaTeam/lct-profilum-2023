import { Flex, Image, Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { IUniversity } from 'shared/models/IUniversity';
import { UniversityInfo } from './UniversityInfo';
import { Tag } from 'shared/components/Tag';
import { Button } from 'shared/components/Button';
import { IconMinus, IconPlus } from '@tabler/icons-react';

interface UniversityCardProps {
  university: IUniversity;
  handleSelectUnivercity: Function;
  handleDeleteUniversity: Function;
  selectedIds: number[];
}

export const UniversityCard = ({
  university,
  handleSelectUnivercity,
  handleDeleteUniversity,
  selectedIds,
}: UniversityCardProps) => {
  return (
    <Flex
      style={
        selectedIds.includes(university.id)
          ? { outline: '2px solid #FA1D80', borderRadius: '24px' }
          : {}
      }
      gap={0}
    >
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
                key={item.name}
                variant={index === 0 ? 'filled' : 'light'}
                text={item.name}
              />
            ))}
          </Flex>
          <Button
            onClick={
              selectedIds.includes(university.id)
                ? () => handleDeleteUniversity(university)
                : () => handleSelectUnivercity(university)
            }
            outline
            disabled={
              selectedIds.length === 3 && !selectedIds.includes(university.id)
            }
          >
            <Flex gap={8}>
              {selectedIds.includes(university.id) ? (
                <>
                  Удалить из моего ТОП-3{' '}
                  <IconMinus stroke={1.5} color="#ADB5BD" />
                </>
              ) : (
                <>
                  Добавить в мой ТОП-3{' '}
                  <IconPlus
                    stroke={1.5}
                    color={
                      selectedIds.length === 3 &&
                      !selectedIds.includes(university.id)
                        ? '#CED4DA'
                        : '#ADB5BD'
                    }
                  />
                </>
              )}
            </Flex>
          </Button>
        </Stack>
      </Card>
    </Flex>
  );
};
