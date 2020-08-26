/* src/App.js */
import Amplify from 'aws-amplify';
import React from 'react';
import awsExports from "./aws-exports";
import SignIn from './modals/signIn';

Amplify.configure(awsExports);

const App = () => {
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default App