import { Flex, Stack } from "@mantine/core";
import TitleWrapper from "../TitleWrapper";
import { AnalyseCard } from "./components/analyse-card";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "main";
import { ProgressCard } from "./components/progress-card";

type Props = {
  children?: React.ReactNode[];
  CustomTitle?: () => JSX.Element;
  title?: string;
  fullWidth?: boolean;
  isHideTitle?: boolean;
};

const MainWrapper = observer(
  ({ children, CustomTitle, title, fullWidth, isHideTitle }: Props) => {
    const { UStore } = useContext(Context);

    return (
      <Stack p={"32px 40px"}>
        {!fullWidth ? (
          <Flex justify="space-between" gap={24}>
            <Stack gap={48} w={1019}>
              {CustomTitle ? (
                <CustomTitle />
              ) : (
                !isHideTitle && <TitleWrapper title={title} />
              )}
              <div className="wrapper">
                {children?.length ? children[0] : <></>}
              </div>
            </Stack>
            <Stack w={497}>
              <div className="wrapper">
                {children?.length ? (
                  <Stack gap={16}>
                    {/* <ProgressCard /> */}
                    {!UStore?.user?.isAnalyzed ? (
                      <AnalyseCard />
                    ) : (
                      <AnalyseCard isAnalysed />
                    )}
                    {children[1]}
                  </Stack>
                ) : (
                  <></>
                )}
              </div>
            </Stack>
          </Flex>
        ) : (
          <Stack gap={0}>{children?.length ? children[0] : <></>}</Stack>
        )}
      </Stack>
    );
  },
);

export default MainWrapper;
