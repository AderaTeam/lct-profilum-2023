import { Context } from "main";
import { useState, useContext, useEffect } from "react";
import { ActivePathSwitch } from "./components/ActivePathSwitch";
import { Flex, Stack, Text } from "@mantine/core";
import { PathInfo } from "./components/PathInfo";
import { observer } from "mobx-react-lite";
import { IPath } from "shared/models/IPath";
import { PathSteps } from "./components/PathSteps";
import { NoPath } from "./components/NoPath";

export const MyPathProgress = observer(() => {
  const { UStore } = useContext(Context);
  const [activePathId, setActivePathId] = useState<number>(
    UStore?.user?.path.length && UStore.user.path[0].id,
  );
  const [activePath, setActivePath] = useState<IPath | undefined>(
    UStore?.user?.path?.find((item) => item.id === UStore?.user?.path[0]?.id),
  );

  useEffect(() => {
    if (typeof activePathId !== "undefined") {
      const info = UStore.user.path.find((item) => item.id === activePathId);
      setActivePath(info);
    }
  }, [activePathId]);

  const handleStepComplete = (id: number) => {
    console.log(id);
  };

  return (
    <Stack gap={32}>
      {UStore.user.path.length ? (
        <>
          <Flex justify={"space-between"} align={"center"}>
            <ActivePathSwitch
              path={UStore.user.path}
              activePathId={activePathId}
              setActivePathId={setActivePathId}
            />
            <PathInfo activePath={activePath} />
          </Flex>
          <PathSteps
            handleStepComplete={handleStepComplete}
            activePath={activePath}
          />
        </>
      ) : (
        <NoPath />
      )}
    </Stack>
  );
});
