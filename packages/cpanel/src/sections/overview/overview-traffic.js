import PropTypes from 'prop-types';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import { Box, Card, CardContent, CardHeader, keyframes, Stack, SvgIcon, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Chart } from '../../components/chart';

const bounce = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`;

const Skeleton = () => (
  <Box sx={{ animation: `${bounce} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite` }}>
    <svg width="400" height="400">
      <path fill="#fff" d="M0 0h400v400H0z" />
      <g transform="matrix(1 0 0 1 10 10)" clipPath="none" stroke="#fff" strokeLinejoin="round">
        <path
          fill="#e5e7eb"
          d="M189.970671 43.500003C269.48301 43.483808 333.960226 107.91567 333.999982 187.428s-64.372996 144.008637-143.885311 144.071954l-.040135-50.399984c51.683005-.041157 93.551294-41.963756 93.525452-93.64677s-41.936032-93.563725-93.619052-93.553198z"
        />
        <path
          fill="#d1d5db"
          d="M189.970671 331.499997c-79.484224-.016189-143.923539-64.430443-143.970646-143.914655S110.315838 43.610541 189.799987 43.500139l.070005 50.399951c-51.664697.071761-93.500594 41.990644-93.469975 93.655382s41.916174 93.534003 93.58092 93.544526z"
        />
      </g>
    </svg>
  </Box>
);

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  ),
};

export const OverviewTraffic = (props) => {
  const { sx, status, trafficSources } = props;
  const labels = React.useMemo(() => {
    return !trafficSources ? [] : trafficSources.map((item) => item.source);
  }, [trafficSources]);
  const chartOptions = useChartOptions(labels);
  const chartSeries = React.useMemo(() => {
    return !trafficSources ? [] : trafficSources.map((item) => item.amount);
  }, [trafficSources]);

  return (
    <Card sx={sx}>
      <CardHeader title="Traffic Source" />
      <CardContent>
        {status === 'loading' && <Skeleton />}
        {status === 'success' && (
          <>
            <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
            <Stack alignItems="center" direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
              {trafficSources.map((item) => {
                const label = item.source;
                return (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {iconMap[label]}
                    <Typography sx={{ my: 1 }} variant="h6">
                      {label}
                    </Typography>
                    <Typography color="text.secondary" variant="subtitle2">
                      {item.amount}%
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  trafficSources: PropTypes.array.isRequired,
  status: PropTypes.oneOf(['idle', 'error', 'loading', 'success']).isRequired,
  sx: PropTypes.object,
};
