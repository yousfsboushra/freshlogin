import { IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import LanguageIcon from "@material-ui/icons/Language";
import i18n, { defaultLanguage, languages } from "../i18n";

function LanguageSwitch() {
  const currentLanguage = i18n.language;
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const changeLanguage = (language: string) => {
    const oldPrefix =
      "/" + (currentLanguage === defaultLanguage ? "" : currentLanguage + "/");
    const newPrefix =
      "/" + (language === defaultLanguage ? "" : language + "/");
    const newLocation = location.pathname.replace(oldPrefix, newPrefix);
    history.push(newLocation);
    i18n.changeLanguage(language);
    handleClose();
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="secondary"
        component="span"
        aria-controls="language-switch"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-switch"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.key}
            onClick={() => changeLanguage(language.key)}
            selected={currentLanguage === language.key}
          >
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageSwitch;
