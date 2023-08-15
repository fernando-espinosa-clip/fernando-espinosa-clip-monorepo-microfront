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

const Page = (props) => {
  const { storage } = props;
  const { t, i18n } = useTranslation();
  const { status, data } = useDashboard(storage);
  const { status: productsStatus, data: productsData } = useProducts(storage, i18n.language);
  const { status: ordersStatus, data: ordersData } = useOrders(storage);

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
                title={t('dashboard.budget')}
                comparativeText={t('dashboard.sinceLastMonth')}
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
                title={t('dashboard.totalCustomers')}
                comparativeText={t('dashboard.sinceLastMonth')}
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
                title={t('dashboard.taskProgress')}
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
                title={t('dashboard.totalProfit')}
              />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                title={t('dashboard.sales')}
                overviewText={t('dashboard.overview')}
                sync={t('dashboard.sync')}
                status={status}
                chartSeries={data?.sales || []}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                title={t('dashboard.trafficSource')}
                status={status}
                trafficSources={data?.trafficSources}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                title={t('dashboard.latestProducts')}
                products={productsData}
                status={productsStatus}
                sx={{ height: '100%' }}
                formatPrefix={t('dashboard.dateAgoPrefix')}
                formatSuffix={t('dashboard.dateAgoSuffix')}
                viewAll={t('dashboard.viewAll')}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                headers={{
                  order: t('dashboard.order'),
                  customer: t('dashboard.customer'),
                  date: t('dashboard.date'),
                  status: t('dashboard.status'),
                }}
                title={t('dashboard.latestOrders')}
                status={ordersStatus}
                orders={ordersData}
                sx={{ height: '100%' }}
                viewAll={t('dashboard.viewAll')}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
