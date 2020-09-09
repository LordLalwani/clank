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

describe("Behavior tests", () => {
  it("Should disable the sign in button when email and password fields are empty", () => {
    fireEvent.change(emailTextField, { target: { value: "" } });
    expect(emailTextField.value).toBe("");

    fireEvent.change(passwordTextField, { target: { value: "" } });
    expect(passwordTextField.value).toBe("");

    expect(signInSubmitButton).toHaveAttribute("disabled");
  });

  it("should remove error messages upon clicking on textFields", () => {
    Auth.signIn = jest.fn().mockImplementation(() => {
      //TODO: move to test.utils
      function amplifySignInError() {
        this.code = "UserNotFoundException";
        this.name = "UserNotFoundException";
        this.message = "User does not exist.";
      }
      amplifySignInError.prototype = Error.prototype;
      throw new amplifySignInError();
    });

    // populates textFields to make sign in button clickable (not disabled)
    fireEvent.change(emailTextField, { target: { value: "testUser" } });
    expect(emailTextField.value).toBe("testUser");
    fireEvent.change(passwordTextField, { target: { value: "123456" } });
    expect(passwordTextField.value).toBe("123456");

    expect(signInSubmitButton).not.toHaveAttribute("disabled");

    // clicks submit button which mocks auth.signIn implementation and throws amplifySignInError
    // this simulates the textField helperText value being the amplifySignInError.message
    fireEvent.click(signInSubmitButton);
    expect(DOM.queryByText("User does not exist.")).toBeTruthy();

    // clicks textfield to clear helperText
    fireEvent.click(emailTextField);
    expect(DOM.queryByText("User does not exist.")).not.toBeTruthy();
  });
});
