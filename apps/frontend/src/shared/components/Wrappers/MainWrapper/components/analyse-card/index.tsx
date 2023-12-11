import { Avatar, Card, Flex, Stack, Text } from "@mantine/core";
import { Button } from "shared/components/Button";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { MY_SOCIALS_ROUTE } from "shared/constants/const";

import mage from "shared/assets/analyse-mage.png";
import steam from "shared/assets/platforms/steam.svg";
import vk from "shared/assets/platforms/vk.svg";
import od from "shared/assets/platforms/od.svg";
import tg from "shared/assets/platforms/tg.svg";
import more from "shared/assets/platforms/more.svg";

import style from "./AnalyseCard.module.scss";
interface AnalyseCardProps {
  isAnalysed?: boolean;
}

export const AnalyseCard = ({ isAnalysed }: AnalyseCardProps) => {
  const icons = [steam, vk, od, tg, more];
  const navigate = useNavigate();

  return (
    <Card radius={32}>
      {!isAnalysed && (
        <Card.Section
          h={187}
          style={{
            backgroundImage: `url(${mage})`,
            backgroundPosition: "60% 20%",
          }}
        />
      )}
      <Card.Section p={32}>
        <Stack gap={24}>
          <Stack gap={10}>
            <Text className={style.title}>
              {isAnalysed ? (
                "Мои соц. сети"
              ) : (
                <>
                  Проанализируем, кем <br /> ты можешь стать?
                </>
              )}
            </Text>
            <Text className={style.text}>
              {isAnalysed
                ? "Ты уже проанализировал свои соц. сети, но можешь поменять их в любой момент"
                : "Подключи соц. сети, чтобы Профилум смог помочь найти профессиютвоей мечты"}
            </Text>
          </Stack>
          <Flex align={"center"} gap={16}>
            <Button outline onClick={() => navigate(MY_SOCIALS_ROUTE)}>
              <Flex gap={8}>
                {isAnalysed ? "Изменить" : "Анализировать"}
                <IconChevronRight stroke={1.5} color="#ADB5BD" />
              </Flex>
            </Button>
            <Flex align={"center"} gap={0}>
              {icons.map((icon, index) => (
                <Avatar
                  style={{ zIndex: icons.length - index }}
                  key={icon}
                  size={32}
                  className={style.icon}
                  src={icon}
                />
              ))}
            </Flex>
          </Flex>
        </Stack>
      </Card.Section>
    </Card>
  );
};
