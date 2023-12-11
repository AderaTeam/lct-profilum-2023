import { useState } from "react";
import MainWrapper from "shared/components/Wrappers/MainWrapper";
import { MySocialsList } from "widgets/my-socials-list";

const MySocialsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  const handleAnalysis = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(true);
    }, 5000);
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
