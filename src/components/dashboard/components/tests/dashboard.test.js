import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "../dashboard";

afterEach(cleanup);

describe("render tests", () => {
  it("should render Dashboard component correctly", () => {
    const props = {
      applicationState: {
        dashboardContext: "dashboard",
      },
    };
    const tree = renderer.create(<Dashboard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
