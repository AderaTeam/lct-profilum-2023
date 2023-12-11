import { Stack, Flex, Text, Image } from "@mantine/core";
import { Tag } from "shared/components/Tag";

import rank from "shared/assets/rank.svg";

import style from "../ProfileCard.module.scss";
import { IUser } from "shared/models/IUser";

export const ProfileInfo = (user: IUser) => {
  return (
    <>
      <Stack gap={6}>
        <Flex align={"center"} gap={12}>
          <Text className={style.name}>{user.username}</Text>
          <Tag variant="light">Топ {user.rating}</Tag>
        </Flex>
        <Flex align={"center"} gap={8}>
          <Text className={style.rank}>{user.rank}</Text>
          <Image h={24} w={24} src={rank} />
        </Flex>
      </Stack>
      <Flex gap={8}>
        {user.path.map((item) => (
          <Tag key={item.id} variant="outline">
            {item.name}
          </Tag>
        ))}
      </Flex>
    </>
  );
};
