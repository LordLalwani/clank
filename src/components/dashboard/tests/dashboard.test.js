import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "../Dashboard";

afterEach(cleanup);

describe("render tests", () => {
  it("should render signIn component correctly", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
