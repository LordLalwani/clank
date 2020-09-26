import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardNavDrawer from "../DashboardNavDrawer";

afterEach(cleanup);

describe("render tests", () => {
  it("should render DashboardNavDrawer component correctly", () => {
    const props = {
      applicationState: {
        drawerOpen: jest.fn(),
      },
    };
    const tree = renderer.create(<DashboardNavDrawer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
