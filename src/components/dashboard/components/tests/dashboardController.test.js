import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardController from "../dashboardController";

afterEach(cleanup);

describe("render tests", () => {
  it("should render DashboardController component correctly", () => {
    const props = {
      applicationState: {
        dashboardContext: "dashboard",
      },
    };
    const tree = renderer.create(<DashboardController {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
