import React from "react";
import {
  render,
  queryByAttribute,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import Signin from "../signIn";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../aws-exports";

Amplify.configure(awsconfig);

const getById = queryByAttribute.bind(null, "id");
afterEach(cleanup);

let DOM;
let emailTextField;
let passwordTextField;
let signInSubmitButton;
beforeEach(() => {
  DOM = render(<Signin />);
  emailTextField = getById(DOM.container, "email-textfield");
  passwordTextField = getById(DOM.container, "password-textfield");
  signInSubmitButton = getById(DOM.container, "sign-in-submit-button");
});
it("renders the signIn and all sub components correctly", () => {
  const emailTextField = getById(DOM.container, "email-textfield");
  expect(emailTextField).toBeTruthy();

  const passwordTextField = getById(DOM.container, "password-textfield");
  expect(passwordTextField).toBeTruthy();

  const signInSubmitButton = getById(DOM.container, "sign-in-submit-button");
  expect(signInSubmitButton).toBeTruthy();
});

describe("functionality tests", () => {
  it("Should disable the sign in button when email and password fields are empty", () => {
    fireEvent.change(emailTextField, { target: { value: "" } });
    expect(emailTextField.value).toBe("");

    fireEvent.change(passwordTextField, { target: { value: "" } });
    expect(passwordTextField.value).toBe("");

    expect(signInSubmitButton).toHaveAttribute("disabled");
  });

  it("should remove error messages upon clicking on textFields", () => {
    Auth.signIn = jest.fn().mockImplementation(() => {
      const errorObj = {
        code: "UserNotFoundException",
        name: "UserNotFoundException",
        message: "User does not exist.",
      };
      throw new Error(errorObj);
    });

    fireEvent.change(emailTextField, {
      target: { value: "triggerValidation" },
    });
    expect(emailTextField.value).toBe("triggerValidation");

    fireEvent.change(passwordTextField, { target: { value: "123456" } });
    expect(passwordTextField.value).toBe("123456");

    expect(signInSubmitButton).not.toHaveAttribute("disabled");
    fireEvent.click(signInSubmitButton);

    //LAST UPDATE: this test goes to the mock implementation of auth.signup but I think im throwing the error incorrectly
    //it doesn't seem to be working on the component catch error side =[
  });
});
