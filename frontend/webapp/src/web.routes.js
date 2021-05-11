import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Layout from "./ui/containers/web/common/Layout";

// import NotFound from "./ui/containers/web/NotFound";
import history from "./web.history";
import ChartRender from './ui/containers/web/dashboard/ChartRender'
import RegisterUser from './ui/containers/web/Profile/register'
import ForgotPassword from "./ui/containers/web/Profile/ForgotPassword";
import ResetPassword from "./ui/containers/web/Profile/ResetPassword";


const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate ? <Layout component={Component} {...props} /> : <Redirect to={{ pathname: "/" }} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = () => {
    const { user } = this.props;
    const token = localStorage.getItem("token");
    if (user.token || token) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            {/* <PrivateRoute path="/*" component={NotFound} authenticate={this.authenticateUser()} /> */}

            {/* <PrivateRoute
              path={`${process.env.PUBLIC_URL}/parallel-corpus/:lang/:source`}
              dontShowLoader
              title={"Organization List"}
              userRoles={["TRANSLATOR"]}
              component={DrillSourceRender}
              authenticate={true}
              currentMenu="organization-list"
              // dontShowHeader={true}

            />
            
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/parallel-corpus/:lang`}
              dontShowLoader
              title={"Organization List"}
              userRoles={["TRANSLATOR"]}
              component={DrillChartRender}
              authenticate={true}
              currentMenu="organization-list"
              // dontShowHeader={true}

            /> */}
            <Route
              path={`${process.env.PUBLIC_URL}/register`}
              title={"Organization List"}
              component={RegisterUser}
              currentMenu="organization-list"

            />
            <Route
              path={`${process.env.PUBLIC_URL}/forgot-password`}
              title={"Forgot Password"}
              component={ForgotPassword}
              currentMenu="forgot-password"

            />
            <Route
              path={`${process.env.PUBLIC_URL}/reset-password`}
              title={"Reset Password"}
              component={ResetPassword}
              currentMenu="reset-password"

            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/parallel-corpus`}
              dontShowLoader
              title={"Organization List"}
              userRoles={["TRANSLATOR"]}
              component={ChartRender}
              authenticate={true}
              currentMenu="organization-list"
              dontShowHeader={false}

            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}`}
              dontShowLoader
              title={"Organization List"}
              userRoles={["TRANSLATOR"]}
              component={ChartRender}
              authenticate={true}
              currentMenu="organization-list"
              dontShowHeader={false}

            />


          </Switch>
        </div>
      </Router>
    );
  }
}

AppRoutes.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus
});

export default connect(
  mapStateToProps,
  null
)(AppRoutes);
