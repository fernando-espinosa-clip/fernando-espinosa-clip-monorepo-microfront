import { mount } from 'auth/AuthApp';
import { Box } from '@mui/material';
import React from 'react';
import storage from '../utils/storage'

import useMount from '../hooks/useMount';

export default (props) => {
  const { ref } = useMount({
    mount,
    storage,
    ...props,
  });
  return <Box sx={{ width: '100%' }} id="mfe-react-ecommerce" ref={ref} />;
};

