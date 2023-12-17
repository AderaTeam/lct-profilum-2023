import { useEffect, useState } from 'react';
import $api from 'shared/api';
import { Tag } from 'shared/components/Tag';
import { IUser } from 'shared/models/IUser';

interface ProfileRatingProps {
  id: number;
}

export const ProfileRating = ({ id }: ProfileRatingProps) => {
  const [rating, setRating] = useState<number>();

  useEffect(() => {
    $api.get<IUser[]>('/user').then((response) => {
      const data = response.data.sort((a, b) => b.points - a.points);
      setRating(data.findIndex((item) => item.id == id));
    });
  }, []);

  return (
    <>
      {rating || rating === 0 ? (
        <Tag variant="light">Топ {rating + 1}</Tag>
      ) : (
        <></>
      )}
    </>
  );
};
