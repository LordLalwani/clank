import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardLayout from "../dashboardRootController";

afterEach(cleanup);

describe("render tests", () => {
  it("should render DashboardLayout component correctly", () => {
    const props = {
      applicationState: {
        drawerOpen: jest.fn(),
      },
    };
    const tree = renderer.create(<DashboardLayout {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
