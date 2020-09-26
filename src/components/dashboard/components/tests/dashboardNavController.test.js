import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardNavController from "../dashboardNavController";

afterEach(cleanup);

describe("render tests", () => {
  it("should render DashboardNavController component correctly", () => {
    const props = {
      applicationState: {
        drawerOpen: jest.fn(),
      },
    };
    const tree = renderer
      .create(<DashboardNavController {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
