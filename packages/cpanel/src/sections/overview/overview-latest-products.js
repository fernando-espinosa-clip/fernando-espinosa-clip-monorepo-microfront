import PropTypes from 'prop-types';
import React from 'react';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Skeleton,
} from '@mui/material';

const skeletonElements = [1, 2, 3, 4, 5];

export const OverviewLatestProducts = (props) => {
  const { products = [], sx, status } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      {status === 'loading' && (
        <List>
          {skeletonElements.map((e, i) => {
            const hasDivider = i < skeletonElements.length - 1;
            return (
              <ListItem divider={hasDivider} key={e.id}>
                <ListItemAvatar>
                  <Skeleton
                    sx={{
                      borderRadius: 1,
                    }}
                    variant="rectangular"
                    width={48}
                    height={48}
                  />
                </ListItemAvatar>
                <ListItemText
                  compo
                  primary={<Skeleton width={'80%'} />}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondary={<Skeleton width={'40%'} />}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              </ListItem>
            );
          })}
        </List>
      )}
      {status === 'success' && (
        <List>
          {products.map((product, index) => {
            const hasDivider = index < products.length - 1;
            const ago = product.updatedAtToNow;

            return (
              <ListItem divider={hasDivider} key={product.id}>
                <ListItemAvatar>
                  {product.thumbnail ? (
                    <Box
                      component="img"
                      src={product.thumbnail}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: 'neutral.200',
                        height: 48,
                        width: 48,
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondary={`Updated ${ago} ago`}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
                <IconButton edge="end">
                  <SvgIcon>
                    <EllipsisVerticalIcon />
                  </SvgIcon>
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
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

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
