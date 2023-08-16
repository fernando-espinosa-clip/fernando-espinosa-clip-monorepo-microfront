import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { getLocaleStr } from '../translations/dateLocale';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, Tooltip } from '@mui/material';

const languages = [
  { name: 'English', flag: '/images/flags/english.png', locale: 'en' },
  { name: 'Español', flag: '/images/flags/spanish.png', locale: 'es' },
];

export const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();
  const currentLangIndex = React.useMemo(() => {
    return languages.findIndex((l) => l.locale === getLocaleStr(i18n.language));
  }, [i18n.language]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title={t('common.changeLanguage')}>
        <Button
          onClick={handleClick}
          color="primary"
          variant="text"
          sx={{ color: 'extras.grey700' }}
          endIcon={<KeyboardArrowDownIcon />}
          id="language-select"
        >
          <LanguageIcon sx={{ mr: 1 }} /> {languages[currentLangIndex].name}
        </Button>
      </Tooltip>
      <Menu
        id="language-menu"
        MenuListProps={{
          'aria-labelledby': 'language-select',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {languages.map((l, index) => {
          return (
            <Box key={l.name}>
              <MenuItem
                selected={index === currentLangIndex}
                sx={{ minWidth: 130 }}
                onClick={() => {
                  i18n.changeLanguage(l.locale);
                  handleClose();
                }}
                disableRipple
              >
                <Box sx={{ mr: 1 }} component={'img'} src={l.flag} alt={l.name} width={24} height={24} />
                {l.name}
              </MenuItem>
              {index < languages.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Menu>
    </>
  );
};
