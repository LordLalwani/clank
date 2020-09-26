import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "../dashboard";

afterEach(cleanup);

describe("render tests", () => {
  it("should render Dashboard component correctly", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
