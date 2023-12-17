import { IPath, IPathStep } from 'shared/models/IPath';

export const eventsTitleFormater = (
  title: string,
  status: string,
  pathSteps?: IPathStep[]
) => {
  if (status === 'up') {
    const splitTtile = title.split('до');
    const lastElem = splitTtile[splitTtile.length - 1];
    splitTtile.pop();
    return lastElem;
  } else {
    const replaseTitle = title.replace('!', '');
    const pathTitle = pathSteps?.find(
      (item) => item.step === +replaseTitle[replaseTitle.length - 1]
    )?.title;
    const splitTtile = title.replace('!', ` "${pathTitle}"`);
    return splitTtile;
  }
};
