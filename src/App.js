/* src/App.js */
import Amplify from "aws-amplify";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import awsExports from "./aws-exports";
import PasswordRecovery from "./components/auth/passwordRecovery";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import DashboardRootController from "./components/dashboard/components/dashboardRootController";
import mapDispatchToProps from "./redux/mapDispatchToProps";
import mapStateToProps from "./redux/mapStateToProps";
import ProtectedRoute from "./utils/protectedRoute";

Amplify.configure(awsExports);

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => (
              <SignIn {...routerProps} {...this.props} />
            )}
          />
          <Route exact path="/password-recovery" component={PasswordRecovery} />
          <Route
            exact
            path="/sign-in"
            render={(routerProps) => (
              <SignIn {...routerProps} {...this.props} />
            )}
          />
          <Route
            exact
            path="/sign-up"
            render={(routerProps) => (
              <SignUp {...routerProps} {...this.props} />
            )}
          />
          <ProtectedRoute
            exact
            path="/dashboard"
            isAuthenticated={true}
            // revert below line
            // isAuthenticated={this.props.userState.isAuthenticated}
            component={DashboardRootController}
            {...this.props}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
