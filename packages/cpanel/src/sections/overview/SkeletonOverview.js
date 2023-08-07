import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Card, CardContent } from '@mui/material';

export const SkeletonOverview = (props) => {
  const { status, component: Component, sx, createProps, ...rest } = props;
  if (status === 'success') {
    const theProps = createProps ? createProps() : {};
    return <Component sx={sx} {...rest} {...theProps} />;
  }
  return (
    <Card sx={sx}>
      <CardContent sx={{ color: 'transparent' }}>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Skeleton variant="text">Budget</Skeleton>
            <Skeleton variant="text">XX</Skeleton>
          </Stack>
          <Skeleton
            variant="circular"
            sx={{
              height: 56,
              width: 56,
            }}
          ></Skeleton>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Skeleton variant="text">XX%</Skeleton>
          </Stack>
          <Skeleton variant="text">Since last month</Skeleton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SkeletonOverview;
