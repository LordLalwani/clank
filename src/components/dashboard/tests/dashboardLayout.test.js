import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import DashboardLayout from "../DashboardLayout";

afterEach(cleanup);

describe("render tests", () => {
  it("should render signIn component correctly", () => {
    const tree = renderer.create(<DashboardLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
