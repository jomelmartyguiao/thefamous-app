import { FC } from 'react';
import C from './Pagination';
import Wrapper from './Wrapper';

const Pagination = C as any;
Pagination.Wrapper = Wrapper as unknown as FC;

export default Pagination;
