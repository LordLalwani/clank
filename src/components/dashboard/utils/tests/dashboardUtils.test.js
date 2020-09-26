import { cleanup } from "@testing-library/react";
import { getDashboardContextIcon } from "../dashboardUtils";

afterEach(cleanup);

describe("Dashboard Utils", () => {
  it("It should get correct getDashboardContextIcon", () => {
    let result = getDashboardContextIcon("Dashboard");
    expect(result.type.displayName).toEqual("DashboardIcon");

    result = getDashboardContextIcon("Invest");
    expect(result.type.displayName).toEqual("ShowChartIcon");

    result = getDashboardContextIcon("Wallet");
    expect(result.type.displayName).toEqual("AccountBalanceWalletIcon");

    result = getDashboardContextIcon("Community");
    expect(result.type.displayName).toEqual("SupervisedUserCircleIcon");

    result = getDashboardContextIcon("Settings");
    expect(result.type.displayName).toEqual("SettingsIcon");

    result = getDashboardContextIcon("Logout");
    expect(result.type.displayName).toEqual("ExitToAppIcon");

    result = getDashboardContextIcon("Default");
    expect(result.type.displayName).toEqual("DashboardIcon");
  });
});
