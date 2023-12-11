import { Loader, LoadingOverlay as MantineLoadingOverlay } from "@mantine/core";

interface Props {
  isLoading?: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
  return (
    <MantineLoadingOverlay
      visible={isLoading || false}
      loaderProps={{ color: "myColor", type: "dots" }}
      overlayProps={{ blur: 0.3 }}
      style={{ borderRadius: "32px" }}
    />
  );
};
