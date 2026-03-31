import * as React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLanguage } from '../LanguageContext';

export default function LanguageSwitcher() {
  const { preference, setPreference, language } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (pref: 'en' | 'nl' | 'system') => () => {
    setPreference(pref);
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="inherit"
        title={preference === 'system' ? `Auto (${language.toUpperCase()})` : language.toUpperCase()}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: 'outlined',
            elevation: 0,
            sx: {
              my: '4px',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem selected={preference === 'system'} onClick={handleLanguageChange('system')}>
          Automatic (System Default)
        </MenuItem>
        <MenuItem selected={preference === 'en'} onClick={handleLanguageChange('en')}>
          English
        </MenuItem>
        <MenuItem selected={preference === 'nl'} onClick={handleLanguageChange('nl')}>
          Nederlands
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
