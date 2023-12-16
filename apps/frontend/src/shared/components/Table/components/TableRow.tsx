import { Flex, Stack } from '@mantine/core';
import { IconArrowsMaximize, IconEdit, IconTrashX } from '@tabler/icons-react';

import style from './TableRow.module.scss';
import { Checkbox } from 'shared/components/Checkbox';
import { Tag } from 'shared/components/Tag';
import { IPathStep } from 'shared/models/IPath';

interface TableRowProps {
  type: string;
  row: any;
  index: number;
}

export const TableRow = ({ index, row, type }: TableRowProps) => {
  return (
    <Flex align={'flex-start'} className={style.row} gap={0}>
      <Flex w={136} align={'center'} className={style.cell} gap={10}>
        <IconArrowsMaximize
          style={{ cursor: 'pointer' }}
          stroke={'2'}
          color={'#212529'}
        />
        <IconEdit
          style={{ cursor: 'pointer' }}
          stroke={'2'}
          color={'#212529'}
        />
        <IconTrashX
          style={{ cursor: 'pointer' }}
          stroke={'2'}
          color={'#F03E3E'}
        />
      </Flex>
      <Flex className={style.cell}>
        <Checkbox />
      </Flex>
      <Flex w={100} className={style.cell}>
        <p className="text bold">{index}</p>
      </Flex>
      {type === 'path' ? (
        <>
          <Flex w={400} className={style.cell}>
            <Tag text={`${row.name}`} variant="light" />
          </Flex>
          <Stack w={848} className={style.cell}>
            {row.pathSteps.map((item: IPathStep, index: number) => (
              <p key={item.id} className="text black">
                {index + 1}. {item.title}
              </p>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Flex w={350} className={style.cell}>
            <p className="text black">{row.name}</p>
          </Flex>
          <Flex w={450} className={style.cell}>
            <p className="text black">{row.description}</p>
          </Flex>
          <Flex gap={8} wrap={'wrap'} w={448} className={style.cell}>
            {row.specialities.map((item: { name: string }, index: number) => (
              <p className="text black">
                #{item.name}
                {row.specialities[index + 1] ? ',' : ''}
              </p>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};
