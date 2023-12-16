import { Context } from 'main';
import { useContext, useState } from 'react';
import $api from 'shared/api';
import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { IPath } from 'shared/models/IPath';
import { MySocialsList } from 'widgets/my-socials-list';

const MySocialsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<IPath[]>([]);
  const { UStore } = useContext(Context);

  const handleAnalysis = () => {
    setIsLoading(true);
    try {
      $api.get('/paths/fakeanalyze').then((response) => {
        setResult(response.data.result);
        UStore.setUser({ ...UStore.user, analysedPaths: response.data.result });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainWrapper>
      <MySocialsList
        result={result}
        isLoading={isLoading}
        handleAnalysis={handleAnalysis}
      />
      <></>
    </MainWrapper>
  );
};

export default MySocialsPage;
