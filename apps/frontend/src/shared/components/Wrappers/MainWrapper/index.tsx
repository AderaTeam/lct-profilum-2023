import { Flex, Stack } from '@mantine/core';
import TitleWrapper from '../TitleWrapper';
import { AnalyseCard } from './components/analyse-card';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from 'main';
import { ProgressCard } from './components/progress-card';

import style from './MainWrapper.module.scss';

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
      <Stack w={'100%'} p={'32px 40px'}>
        {!fullWidth ? (
          <Flex justify="space-between" gap={24}>
            <Stack gap={48} className={style.center}>
              {CustomTitle ? (
                <CustomTitle />
              ) : (
                !isHideTitle && <TitleWrapper title={title} />
              )}
              <div className="wrapper">
                {children?.length ? children[0] : <></>}
              </div>
            </Stack>
            <Stack className={style.right}>
              <div className="wrapper">
                {UStore.user.role === 'user' ? (
                  <></>
                ) : (
                  <>
                    {children?.length ? (
                      <Stack gap={16}>
                        {/* <ProgressCard /> */}
                        {!UStore?.user?.isAnalyzed ? (
                          <AnalyseCard
                            paths={UStore.user.paths}
                            analysedPaths={UStore.user.analysedPaths}
                          />
                        ) : (
                          <AnalyseCard isAnalysed />
                        )}
                        {children[1]}
                      </Stack>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </Stack>
          </Flex>
        ) : (
          <Stack gap={0}>{children?.length ? children[0] : <></>}</Stack>
        )}
      </Stack>
    );
  }
);

export default MainWrapper;
