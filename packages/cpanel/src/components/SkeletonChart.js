import React from 'react';
import { keyframes } from '@mui/material';
import Box from '@mui/material/Box';

const bounce = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`;

const chatStyle = () => {
  const create = (maxLevel = 5) => {
    const result = {};
    for (let x = 1; x <= maxLevel; x++) {
      result[`& .h-${x}`] = { height: `${(x + 1) * 3}rem` };
      result[`& .bar-200`] = {
        flex: '1 1 0%',
        borderRadius: '0.25rem',
        backgroundColor: '#E5E7EB',
      };
      result[`& .bar-300`] = {
        flex: '1 1 0%',
        borderRadius: '0.25rem',
        backgroundColor: '#D1D5DB',
      };
    }
    return result;
  };

  return {
    display: 'flex',
    margin: '1.5rem',
    marginLeft: '1rem',
    alignItems: 'baseline',
    '&>:not([hidden])': {
      marginRight: '0.5%',
      marginLeft: '0.5%',
    },
    '&~:not([hidden])': {
      marginRight: '0.5%',
      marginLeft: '0.5%',
    },
    ...create(5),
  };
};

export const SkeletonChart = () => {
  const style = chatStyle();
  const bars = [
    [200, 1],
    [200, 2],
    [200, 3],
    [300, 4],
    [200, 5],
    [300, 4],
    [200, 3],
    [200, 2],
    [200, 5],
    [200, 2],
    [200, 3],
    [300, 4],
    [200, 5],
    [300, 4],
    [200, 3],
    [200, 2],
    [200, 1],
  ];
  return (
    <Box sx={{ animation: `${bounce} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite` }}>
      <Box sx={style}>
        {bars.map((b, i) => (
          <Box key={i} className={`bar-${b[0]} h-${b[1]}`}></Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkeletonChart;
