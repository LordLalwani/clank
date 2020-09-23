import React from "react";
import {
  render,
  queryByAttribute,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import PasswordRecovery from "../passwordRecovery";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../aws-exports";
import renderer from "react-test-renderer";

Amplify.configure(awsconfig);

const getById = queryByAttribute.bind(null, "id");
afterEach(cleanup);

let DOM;
let emailTextField;
let emailButton;

beforeEach(() => {
  DOM = render(<PasswordRecovery />);
  emailTextField = getById(DOM.container, "email-textfield");
  emailButton = getById(DOM.container, "email-button");
});

describe("render tests", () => {
  it("should render all sub components correctly", () => {
    expect(emailTextField).toBeTruthy();
    expect(emailButton).toBeTruthy();
  });

  it("should render PasswordRecovery component correctly", () => {
    const tree = renderer.create(<PasswordRecovery />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Behavior tests", () => {
  it("should enable email button if email textfield is not empty", () => {
    expect(emailButton).toHaveAttribute("disabled");
    fireEvent.change(emailTextField, { target: { value: "test@test.com" } });
    expect(emailButton).not.toHaveAttribute("disabled");
  });
  it("should show new password & confirmation code textfields and confirm password button upon email button clicked", async () => {
    Auth.forgotPassword = jest.fn().mockImplementation(() => {
      const response = { user: "larryTheLama" };
      return response;
    });
    fireEvent.change(emailTextField, { target: { value: "test@test.com" } });
    expect(emailButton).toBeTruthy();
    fireEvent.click(emailButton);

    await waitFor(() => {
      expect(Auth.forgotPassword).toHaveBeenCalledTimes(1);
    });

    // Was having problems targeting confirmationCodeButton so queried by autoComplete
    // this should be replaced asap >:[
    const getByAutoComplete = queryByAttribute.bind(null, "autoComplete");
    const confirmationCodeTextField = getByAutoComplete(
      DOM.container,
      "confirm-code-textfield"
    );
    expect(confirmationCodeTextField).toBeTruthy();

    expect(DOM.queryByText("Confirm New Password")).toBeTruthy();

    const newPasswordTextfield = getByAutoComplete(
      DOM.container,
      "new-password-textfield"
    );
    expect(newPasswordTextfield).toBeTruthy();
  });
});
