/* src/App.js */
import Amplify from "aws-amplify";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PasswordRecovery from "./components/auth/passwordRecovery";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import awsExports from "./aws-exports";
import Dashboard from "./components/dashboard";

Amplify.configure(awsExports);

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <SignIn {...props} />} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/password-recovery" component={PasswordRecovery} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
}
