import React from 'react';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewBudget } from '../../sections/overview/overview-budget';
import { OverviewLatestOrders } from '../../sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from '../../sections/overview/overview-latest-products';
import { OverviewSales } from '../../sections/overview/overview-sales';
import { OverviewTasksProgress } from '../../sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from '../../sections/overview/overview-total-customers';
import { OverviewTotalProfit } from '../../sections/overview/overview-total-profit';
import { OverviewTraffic } from '../../sections/overview/overview-traffic';
import SkeletonOverview from '../../sections/overview/SkeletonOverview';
import useDashboard from '../../hooks/data/useDashboard';
import useProducts from '../../hooks/data/useProducts';
import useOrders from '../../hooks/data/useOrders';
import { useTranslation } from 'react-i18next';
import { getLocaleStr } from '../../translations/dateLocale';

const getMonths = (lang = 'en') => {
  switch (lang) {
    case 'es':
      return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    default:
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
};

const Page = (props) => {
  const { storage } = props;
  const { t, i18n } = useTranslation('dashboard');
  const { status, data } = useDashboard(storage, i18n.language);
  const { status: productsStatus, data: productsData } = useProducts(storage, i18n.language);
  const { status: ordersStatus, data: ordersData } = useOrders(storage);
  const months = React.useMemo(() => getMonths(getLocaleStr(i18n.language)), [i18n.language]);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <SkeletonOverview
                component={OverviewBudget}
                createProps={() => {
                  return {
                    difference: data.budget.comparative,
                    positive: data.budget.comparative > 0,
                    value: `$${data.budget.amount}`,
                  };
                }}
                sx={{ height: '100%' }}
                status={status}
                title={t('budget')}
                comparativeText={t('sinceLastMonth')}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <SkeletonOverview
                component={OverviewTotalCustomers}
                createProps={() => {
                  return {
                    difference: data.totalCostumers.comparative,
                    positive: data.totalCostumers.comparative > 0,
                    value: `$${data.totalCostumers.amount}`,
                  };
                }}
                sx={{ height: '100%' }}
                status={status}
                title={t('totalCustomers')}
                comparativeText={t('sinceLastMonth')}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <SkeletonOverview
                component={OverviewTasksProgress}
                sx={{ height: '100%' }}
                createProps={() => ({
                  value: data.dayProgress,
                })}
                status={status}
                title={t('taskProgress')}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <SkeletonOverview
                component={OverviewTotalProfit}
                sx={{ height: '100%' }}
                createProps={() => ({
                  value: `$${data.totalProfit}k`,
                })}
                status={status}
                title={t('totalProfit')}
              />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                title={t('sales')}
                overviewText={t('overview')}
                sync={t('sync')}
                status={status}
                chartSeries={data?.sales || []}
                sx={{ height: '100%' }}
                months={months}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                title={t('trafficSource')}
                status={status}
                trafficSources={data?.trafficSources}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                title={t('latestProducts')}
                products={productsData}
                status={productsStatus}
                sx={{ height: '100%' }}
                formatPrefix={t('dateAgoPrefix')}
                formatSuffix={t('dateAgoSuffix')}
                viewAll={t('viewAll')}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                headers={{
                  order: t('order'),
                  customer: t('customer'),
                  date: t('date'),
                  status: t('status'),
                }}
                title={t('latestOrders')}
                status={ordersStatus}
                orders={ordersData}
                sx={{ height: '100%' }}
                viewAll={t('viewAll')}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
