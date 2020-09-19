import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardNav from "../components/dashboardNav";

afterEach(cleanup);

describe("render tests", () => {
  it("should render signIn component correctly", () => {
    const tree = renderer.create(<DashboardNav />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
