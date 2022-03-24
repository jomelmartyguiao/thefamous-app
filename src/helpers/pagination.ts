import _ from 'lodash';

export const getPage = (data: object): number => {
  const page: number = +_.get(data, 'meta.page', 1);
  return page;
};

export const getLastPage = (data: object): number => {
  const page: number = +_.get(data, 'meta.lastPage', 1);
  return page;
};
