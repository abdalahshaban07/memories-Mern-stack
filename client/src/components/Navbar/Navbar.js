import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Language from "@material-ui/icons/Language";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import memoriesLogo from "../../images/memories.png";
import memoriesText from "../../images/memoriesText.png";
import decode from "jwt-decode";
import { LOGOUT } from "../../constants/actionTypes";
import { useTranslation } from "react-i18next";
import { languages } from "./Languages";
import i18next from "i18next";
import cookies from "js-cookie";
import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";
import { getLanguage } from "../../helper/getLang";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  moment.locale(getLanguage());

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("appTitle");
  }, [currentLanguage]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <span style={{ display: "inline-block", marginInline: "5px" }}></span>
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <>
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                {t("logout")}
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              {t("sign_in")}
            </Button>
          </>
        )}

        <div style={{ marginInlineStart: "1rem" }}>
          <PopupState variant="popper" popupId="demo-popup-menu" st>
            {(popupState) => (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  {...bindTrigger(popupState)}
                >
                  <Language />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  {languages.map(({ code, country_code, name }) => (
                    <MenuItem
                      key={country_code}
                      onClick={() => {
                        i18next.changeLanguage(code);
                        popupState.close();
                      }}
                      disabled={code === currentLanguageCode}
                    >
                      <span
                        className={`flag-icon flag-icon-${country_code} `}
                        style={{
                          opacity: currentLanguageCode === code ? 0.5 : 1,
                          marginInlineEnd: "10px",
                        }}
                      ></span>
                      {name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </PopupState>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
