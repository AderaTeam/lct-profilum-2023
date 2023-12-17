export const eventsTitleFormater = (
  title: string,
  status: string,
  pathTitle: string
) => {
  if (status === 'up') {
    const splitTtile = title.split(' ');
    const lastElem = splitTtile[splitTtile.length - 1];
    splitTtile.pop();
    return { arr: splitTtile, lastElem: lastElem };
  } else {
    const splitTtile = title.replace('!', `${pathTitle}!`);
    return splitTtile;
  }
};
