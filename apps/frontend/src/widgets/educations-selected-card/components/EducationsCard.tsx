import { Flex } from '@mantine/core';

import style from './EducationsCard.module.scss';

interface EducationsCardProps {
  name?: string;
  image?: string;
}

export const EducationsCard = ({ name, image }: EducationsCardProps) => {
  return (
    <Flex
      className={name ? style['card-image'] : style.card}
      align={'center'}
      justify={'center'}
      p={16}
      h={144}
      w={313}
      style={
        image
          ? {
              background: `url(${image})`,
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      {name ? (
        <p className="text bold white">{name}</p>
      ) : (
        <p className="text bold pink">
          Университет / колледж <br /> не выбран
        </p>
      )}
    </Flex>
  );
};
