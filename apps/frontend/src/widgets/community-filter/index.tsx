import { Flex } from '@mantine/core';
import { useState } from 'react';
import { Chip } from 'shared/components/Chip';

interface CommunityFilterProps {
  paths: string[];
  setActivePath: React.Dispatch<React.SetStateAction<string>>;
  activePath: string;
}

export const CommunityFilter = ({
  paths,
  activePath,
  setActivePath,
}: CommunityFilterProps) => {
  return (
    <Flex wrap={'wrap'} align={'center'} gap={12}>
      <Chip
        id={'all'}
        aciveId={activePath}
        onClick={() => setActivePath('all')}
        text="Все"
      />
      {paths.map((item) => (
        <Chip
          key={item}
          id={item}
          aciveId={activePath}
          onClick={() => setActivePath(item)}
          text={item}
        />
      ))}
    </Flex>
  );
};
