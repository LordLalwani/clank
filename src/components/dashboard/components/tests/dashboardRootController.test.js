import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardRootController from "../dashboardRootController";

afterEach(cleanup);

describe("render tests", () => {
  it("should render DashboardRootController component correctly", () => {
    const props = {
      applicationState: {
        drawerOpen: jest.fn(),
      },
    };
    const tree = renderer
      .create(<DashboardRootController {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
