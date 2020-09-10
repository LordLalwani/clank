import React from "react";
import {
  render,
  queryByAttribute,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import SignUp from "../signUp";

import Amplify, { Auth } from "aws-amplify";
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
let confirmationCodeTextfield;
let confirmationCodeButton;

beforeEach(() => {
  DOM = render(<SignUp />);
  emailTextField = getById(DOM.container, "email-textfield");
  passwordTextField = getById(DOM.container, "password-textfield");
  confirmPasswordTextField = getById(
    DOM.container,
    "confirm-password-textfield"
  );
  verifyEmailButton = getById(DOM.container, "verify-email-button");
  confirmationCodeTextfield = getById(
    DOM.container,
    "confirmation-code-textfield"
  );
  confirmationCodeButton = getById(DOM.container, "confirmation-code-button");
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
  it("should display 'passwords don't match' when the password and confirm password textfields are not equal", () => {
    expect(DOM.queryByText("Passwords don't match")).not.toBeTruthy();
    fireEvent.change(passwordTextField, { target: { value: "notTheSame" } });
    fireEvent.change(confirmPasswordTextField, {
      target: { value: "sameTheNot" },
    });
    expect(DOM.queryByText("Passwords don't match")).toBeTruthy();

    // checks that `passwords don't match` message doesn't show on inverse
    fireEvent.change(passwordTextField, { target: { value: "samesies" } });
    fireEvent.change(confirmPasswordTextField, {
      target: { value: "samesies" },
    });
    expect(DOM.queryByText("Passwords don't match")).not.toBeTruthy();
  });

  it("should display the code confirmation textfield and button upon clicking `verify my email`", async () => {
    Auth.signUp = jest.fn().mockImplementation(() => {
      const response = { user: "larryTheLama" };
      return response;
    });

    fireEvent.change(emailTextField, { target: { value: "teeest@test.com" } });
    fireEvent.change(passwordTextField, {
      target: { value: "samesies123456" },
    });
    fireEvent.change(confirmPasswordTextField, {
      target: { value: "samesies123456" },
    });
    expect(verifyEmailButton).not.toHaveAttribute("disabled");
    expect(confirmationCodeTextfield).not.toBeTruthy();
    expect(confirmationCodeButton).not.toBeTruthy();
    expect(DOM.queryByText("Confirm")).not.toBeTruthy();

    fireEvent.click(verifyEmailButton);

    await waitFor(() => {
      expect(Auth.signUp).toHaveBeenCalledTimes(1);
    });
    expect(DOM.queryByText("Confirm")).toBeTruthy();

    // Was having problems targeting confirmationCodeButton so queried by autoComplete
    // this should be replaced asap >:[
    const getByAutoComplete = queryByAttribute.bind(null, "autoComplete");
    const confirmationCodeTextField2 = getByAutoComplete(DOM.container, "code");
    expect(confirmationCodeTextField2).toBeTruthy();
  });

  it("should make 'verify my email' button not disabled given textfields are not empty and passwords match", () => {
    expect(verifyEmailButton).toHaveAttribute("disabled");
    fireEvent.change(emailTextField, { target: { value: "test@test.com" } });
    fireEvent.change(passwordTextField, {
      target: { value: "samesies123456" },
    });
    fireEvent.change(confirmPasswordTextField, {
      target: { value: "samesies123456" },
    });
    expect(verifyEmailButton).not.toHaveAttribute("disabled");
  });
});
