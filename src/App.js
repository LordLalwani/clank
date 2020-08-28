/* src/App.js */
import Amplify from 'aws-amplify';
import React from 'react';
import awsExports from "./aws-exports";
import SignIn from './auth/signIn';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from "./components/dashboard"

Amplify.configure(awsExports);

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={props => (<SignIn {...props} />)} />
          <Route exact path={"/dashboard"} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    )
  }
}