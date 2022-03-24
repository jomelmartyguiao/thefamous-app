import type {
    MessageProps
  } from '../types';
  
  interface DocPaperlessState {
    messageInfo: MessageProps | object;
  }
  
  const initialState: DocPaperlessState = {
    messageInfo: {},
  };
  
  export default initialState;
  