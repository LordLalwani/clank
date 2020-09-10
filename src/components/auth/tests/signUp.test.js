import React from "react";
import { render, queryByAttribute, cleanup } from "@testing-library/react";
import SignUp from "../signUp";

import Amplify from "aws-amplify";
import awsconfig from "../../../aws-exports";
import renderer from "react-test-renderer";

Amplify.configure(awsconfig);

const getById = queryByAttribute.bind(null, "id");
afterEach(cleanup);

let DOM;
let emailTextField;
let passwordTextField;
let confirmPasswordTextField;
let verifyEmailButton;
// let confirmationCodeTextfield;

beforeEach(() => {
  DOM = render(<SignUp />);
  emailTextField = getById(DOM.container, "email-textfield");
  passwordTextField = getById(DOM.container, "password-textfield");
  confirmPasswordTextField = getById(
    DOM.container,
    "confirm-password-textfield"
  );
  verifyEmailButton = getById(DOM.container, "verify-email-button");
  //   confirmationCodeTextfield = getById(
  //     DOM.container,
  //     "confirmation-code-textfield"
  //   );
});

describe("render tests", () => {
  it("should render all sub components correctly", () => {
    expect(emailTextField).toBeTruthy();
    expect(passwordTextField).toBeTruthy();
    expect(confirmPasswordTextField).toBeTruthy();
    expect(verifyEmailButton).toBeTruthy();
  });

  it("should render signUp component correctly", () => {
    const tree = renderer.create(<SignUp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Behavior tests", () => {
  it("should display the code confirmation textfield and button upon clicking `verify my email`", () => {});

  it("should display 'passwords don't match' when the password and confirm password textfields are not equal", () => {});

  it("should make 'verify my email' button not disabled given textfields are not empty and passwords match", () => {});
});
