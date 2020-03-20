import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
} from "@material-ui/core";
import {
  Dashboard as MenuIcon,
  Person as AccountIcon
} from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles";
import { Typography } from "../Wrappers/Wrappers";
import { useUserDispatch, signOut} from "../../context/UserContext";

export default function Header(props) {
  var classes = useStyles();

  var userDispatch = useUserDispatch();

  var [profileMenu, setProfileMenu] = useState(null);



  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          href="#/app/dashboard"
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          FCS Analyzer
        </Typography>
        <div className={classes.grow} />
        
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {/* John Smith */}
              {localStorage.getItem("fullname")}
            </Typography>
            <Typography variant="h6" weight="medium" color="primary">
              {/* John Smith */}
              {localStorage.getItem("usergroup")}
            </Typography>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
