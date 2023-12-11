import { Flex, Image, Stack } from "@mantine/core";
import { IconArrowUpRight, IconCircleCheckFilled } from "@tabler/icons-react";
import { Button } from "shared/components/Button";
import { Card } from "shared/components/Card";
import { LoadingOverlay } from "shared/components/LoadingOverlay";
import { ISocial } from "shared/models/ISocial";

interface SocialCardProps {
  social: ISocial;
  isLoading?: boolean;
}

export const SocialCard = ({ social, isLoading }: SocialCardProps) => {
  return (
    <Card>
      <LoadingOverlay isLoading={isLoading} />
      <Flex align={"center"} gap={16}>
        <Image src={social.image} w={64} h={64} />
        <Stack gap={12}>
          <h3 className="h3">{social.name}</h3>
          <p style={{ color: "#212529" }} className="text">
            {social.description}
          </p>
        </Stack>
        <div style={{ marginLeft: "auto" }}>
          {social.status === "connected" ? (
            <Flex gap={6}>
              <IconCircleCheckFilled
                style={{
                  color: "#FA1D80",
                }}
              />
              <p className="text bold" style={{ color: "#FA1D80" }}>
                Готово
              </p>
            </Flex>
          ) : (
            <Button disabled={social.status === "soon" ? true : false} outline>
              <Flex gap={8}>
                Подключить <IconArrowUpRight stroke={1.5} color="#ADB5BD" />
              </Flex>
            </Button>
          )}
        </div>
      </Flex>
    </Card>
  );
};
