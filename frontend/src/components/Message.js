import React from 'react';
import { Alert } from 'react-bootstrap';

//passing in two props: variand and children
//variant: whatever I pass into ths compoent as variant
//children: text that I want inside
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
  //info = blue color
};
export default Message;
