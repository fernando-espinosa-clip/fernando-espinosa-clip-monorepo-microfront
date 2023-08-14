import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#EAEAEA',
  },
  toolbar: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Header({ isSignedIn, onSignOut }) {
  const classes = useStyles();
  const history = useHistory();
  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap component={RouterLink} to="/">
            App
          </Typography>
          <Box>
            {isSignedIn && (
              <IconButton
                onClick={() => history.push('/cpanel/dashboard')}
                color={'secondary'}
                sx={{ mr: 2 }}
                aria-label="delete"
              >
                <SettingsIcon />
              </IconButton>
            )}
            <Button
              color="primary"
              variant="contained"
              className={classes.link}
              component={RouterLink}
              to={isSignedIn ? '/auth/signout' : '/auth/signin'}
              onClick={onClick}
            >
              {isSignedIn ? 'Logout' : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
