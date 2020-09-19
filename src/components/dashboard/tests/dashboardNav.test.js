import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardNavController from "../components/DashboardNavController";

afterEach(cleanup);

describe("render tests", () => {
  it("should render signIn component correctly", () => {
    const tree = renderer.create(<DashboardNavController />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
