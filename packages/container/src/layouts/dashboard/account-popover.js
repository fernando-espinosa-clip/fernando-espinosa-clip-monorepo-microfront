import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const history = useHistory();
  const { t } = useTranslation();

  const handleSignOut = useCallback(() => {
    onClose?.();
    history.push('/auth/signout');
  }, [onClose, history]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">{t('sideNav.account')}</Typography>
        <Typography color="text.secondary" variant="body2">
          Anika Visser
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>{t('sideNav.signOut')}</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
