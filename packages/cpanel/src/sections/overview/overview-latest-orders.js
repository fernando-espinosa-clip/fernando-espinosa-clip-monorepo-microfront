import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
} from '@mui/material';
import { SeverityPill } from '../../components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error',
};

const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx, status } = props;
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {status === 'loading' &&
                skeletonItems.map((s) => (
                  <TableRow hover key={s}>
                    <TableCell>
                      <Skeleton width={30} height={16} />{' '}
                    </TableCell>
                    <TableCell>
                      <Skeleton width={15} height={16} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} height={16} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={50} height={16} />
                    </TableCell>
                  </TableRow>
                ))}

              {status === 'success' &&
                orders.map((order) => {
                  const createdAt = format(new Date(order.createdAt), 'dd/MM/yyyy');
                  const fullName = `${order.customer?.first_name || ''} ${order.customer?.last_name || ''}`;
                  return (
                    <TableRow hover key={order.id}>
                      <TableCell>{order.ref}</TableCell>
                      <TableCell>{fullName}</TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>
                        <SeverityPill color={order.status}>{order.status}</SeverityPill>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </>
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
