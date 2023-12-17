import { Context } from 'main';
import { useContext, useEffect, useState } from 'react';
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
    $api.get('/analyze').then((response) => {
      if (response) {
        setIsLoading(false);
        setResult(response.data.result);
        UStore.setUser({
          ...UStore.user,
          analysedPaths: response.data.result,
        });
      } else {
        setIsLoading(false);
      }
    });
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
