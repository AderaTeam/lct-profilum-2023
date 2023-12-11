import { Flex, Image, Stack, Text } from "@mantine/core";
import { Card } from "shared/components/Card";

import card from "shared/assets/card.png";
import box from "shared/assets/box.png";
import bank from "shared/assets/bank.png";

import style from "./ProfileAchievement.module.scss";

export const ProfileAchievement = () => {
  const data = [
    {
      image: card,
      id: 0,
      name: "Неудержимая сила",
      date: "5 декабря",
    },
    {
      image: bank,
      id: 1,
      name: "Неудержимая сила",
      date: "5 декабря",
    },
    {
      image: box,
      id: 2,
      name: "Неудержимая сила",
      date: "5 декабря",
    },
    {
      image: bank,
      id: 3,
      name: "Неудержимая сила",
      date: "5 декабря",
    },
    {
      image: box,
      id: 4,
      name: "Неудержимая сила",
      date: "5 декабря",
    },
    {
      image: bank,
      id: 5,
      name: "Неудержимая сила",
      date: "5 декабря",
    },
    {
      image: box,
      id: 6,
      name: "Неудержимая сила",
      date: "5 декабря",
    },
  ];

  return (
    <Card>
      <Stack gap={24}>
        <Text className={style.title}>
          Достижения <span>({data.length})</span>
        </Text>
        <Flex gap={16} wrap={"wrap"}>
          {data.map((item) => (
            <Stack key={item.id} gap={14}>
              <Image
                className={style.image}
                w={178.2}
                h={160}
                radius={10}
                src={item.image}
              />
              <Stack gap={6}>
                <Text className={style.name}>{item.name}</Text>
                <Text className={style.date}>{item.date}</Text>
              </Stack>
            </Stack>
          ))}
        </Flex>
      </Stack>
    </Card>
  );
};
