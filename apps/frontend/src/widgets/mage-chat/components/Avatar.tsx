import { Flex, Avatar as MantineAvatar } from "@mantine/core";

interface AvatarProps {
  name: string;
  image: string;
}

export const Avatar = ({ name, image }: AvatarProps) => {
  return (
    <Flex align={"center"} gap={12}>
      <MantineAvatar src={image} h={40} w={40} />
      <h3 className="h3">{name}</h3>
    </Flex>
  );
};
