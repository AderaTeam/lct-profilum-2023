import { Flex, Loader, Stack } from "@mantine/core";
import { Card } from "shared/components/Card";
import { Avatar } from "./components/Avatar";

import mage from "shared/assets/analyse-mage.png";
import avatar from "shared/assets/avatar.png";

import style from "./MageChat.module.scss";
import { Button } from "shared/components/Button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ResultList } from "./components/ResultList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const MageChat = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 4500);
  }, []);

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isShow]);

  return (
    <Stack w={"100%"} gap={12}>
      <Stack align="flex-end">
        <Card outline radius="24px 2px 24px 24px" w={480} bg="transparent">
          <Stack gap={16}>
            <Avatar name="Эмили Сторан" image={avatar} />
            <p className={style.text}>
              Профилум, помоги! Хочу знать на кого пойти учиться!
            </p>
          </Stack>
        </Card>
      </Stack>
      {isShow && (
        <>
          {isLoading ? (
            <Loader size={"xl"} color="gray" type="dots" />
          ) : (
            <Stack>
              <Card radius="2px 24px 24px 24px" bg="#F8F9FA">
                <Stack gap={32}>
                  <Stack gap={16}>
                    <Avatar name="Профилум" image={mage} />
                    <p className="text black">
                      Вижу... тебя в учебном заведении твоей мечты! А там... что
                      это? Программирование... Дизайн... IT... Хмммм. <br />{" "}
                      Точно! Я вижу, тебе суждено стать{" "}
                      <span className="text pink">Системным аналитиком!</span>
                    </p>
                  </Stack>
                  <ResultList />
                  <Flex justify={"space-between"}>
                    <Button onClick={() => navigate(-1)}>
                      <Flex gap={8}>
                        <IconChevronLeft stroke={1.5} color="#ffff" />
                        Назад
                      </Flex>
                    </Button>
                    <Button disabled>
                      <Flex gap={8}>
                        К мои путям
                        <IconChevronRight stroke={1.5} color="#ffff" />
                      </Flex>
                    </Button>
                  </Flex>
                </Stack>
              </Card>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};
