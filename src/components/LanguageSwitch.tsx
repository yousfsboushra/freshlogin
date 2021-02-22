import { IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { defaultLanguage, languages, useCurrentLanguage } from "../pages/pages";
import LanguageIcon from "@material-ui/icons/Language";
import i18n from "../i18n";

function LanguageSwitch() {
  const currentLanguage = useCurrentLanguage();
  const location = useLocation();
  const history = useHistory();
  const [languageState, setlanguageState] = useState(currentLanguage);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const changeLanguage = (language: string) => {
    const oldPrefix =
      "/" + (currentLanguage === defaultLanguage ? "" : currentLanguage + "/");
    const newPrefix =
      "/" + (language === defaultLanguage ? "" : language + "/");
    const newLocation = location.pathname.replace(oldPrefix, newPrefix);
    setlanguageState(language);
    i18n.changeLanguage(language);
    history.push(newLocation);
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
            selected={languageState === language.key}
          >
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageSwitch;
