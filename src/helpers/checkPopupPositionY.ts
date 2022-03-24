export const checkPopupPositionY = (
  wrapperId: string,
  itemId: string
): boolean => {
  const listItem = document.getElementById(itemId);
  const listItemOffsetTop: number = listItem?.offsetTop || 0;

  const listWrapper = document.getElementById(wrapperId);
  const listWrapperscrollTop: number = listWrapper?.scrollTop || 0;
  const listWrapperHeight: number = listWrapper?.clientHeight || 0;

  const relativeOffset = listItemOffsetTop - listWrapperscrollTop;
  const isTop = relativeOffset > listWrapperHeight / 2;

  return isTop;
};

export default checkPopupPositionY;
