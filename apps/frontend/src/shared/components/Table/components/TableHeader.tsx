import { Flex } from '@mantine/core';

import style from './TableRow.module.scss';
import { Checkbox } from 'shared/components/Checkbox';

interface TableHeaderProps {
  type: string;
}

export const TableHeader = ({ type }: TableHeaderProps) => {
  return (
    <Flex align={'center'}>
      <Flex w={136} className={style.cell}>
        <p className="text bold">Действия</p>
      </Flex>
      <Flex className={style.cell}>
        <Checkbox />
      </Flex>
      <Flex className={style.cell} w={100}>
        <p className="text bold">№</p>
      </Flex>

      {type === 'path' ? (
        <>
          <Flex w={400} className={style.cell}>
            <p className="text bold">Путь</p>
          </Flex>
          <Flex w={848} className={style.cell}>
            <p className="text bold">Шаги</p>
          </Flex>
        </>
      ) : (
        <>
          <Flex w={350} className={style.cell}>
            <p className="text bold">Профессия и отрасль</p>
          </Flex>
          <Flex w={450} className={style.cell}>
            <p className="text bold">Описание</p>
          </Flex>
          <Flex w={448} className={style.cell}>
            <p className="text bold">Специальность</p>
          </Flex>
        </>
      )}
    </Flex>
  );
};
