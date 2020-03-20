import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { useLayoutState } from "../../context/LayoutContext";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header";
import Dashboard from "../../pages/dashboard";
import UserManagement from "../../pages/fcs/UserManagement";
import Profile from "../../pages/fcs/UserProfile";
import Upload from "../../pages/fcs/Upload";
import Analyze from "../../pages/fcs/Analyze";


function Layout(props) {
  var classes = useStyles();
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/upload" component={Upload} />
              <Route path="/app/analyze" component={Analyze} />>
              <Route path="/app/users" component={UserManagement} />
              <Route path="/app/profile" component={Profile} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
