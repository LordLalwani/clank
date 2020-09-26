import { cleanup } from "@testing-library/react";
import { applicationSlice } from "../applicationSlice";
require("jest-localstorage-mock");

afterEach(cleanup);

describe("applicationSlice tests", () => {
  it("should set lastKnownContext to localStorage", () => {
    applicationSlice.reducer(
      {},
      applicationSlice.actions.setDashboardContext("Dashboard")
    );
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "lastKnownContext",
      "Dashboard"
    );
  });
});
