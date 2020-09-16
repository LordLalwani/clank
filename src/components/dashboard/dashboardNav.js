import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import ShowChartOutlinedIcon from "@material-ui/icons/ShowChartOutlined";

const DashboardNavContainer = styled(Grid)`
  height: 100vh;
  background: white;
`;
const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1px 4px 12px 20px;
`;
const IconDiv = styled.div`
  padding-right: 1.5rem;
`;
const navButtons = [
  {
    label: "Dashboard",
    icon: "DASHBOARD",
  },
  {
    label: "Trade",
    icon: "TRADE",
  },
  {
    label: "Wallet",
    icon: "WALLET",
  },
  {
    label: "Community",
    icon: "COMMUNITY",
  },
];

const getIcon = (iconName) => {
  switch (iconName) {
    case "DASHBOARD":
      return <DashboardOutlinedIcon />;
    case "WALLET":
      return <LocalAtmOutlinedIcon />;
    case "COMMUNITY":
      return <EmojiEmotionsOutlinedIcon />;
    case "TRADE":
      return <ShowChartOutlinedIcon />;
    default:
      return "foo";
  }
};

export default class DashboardNav extends React.Component {
  render() {
    return (
      <DashboardNavContainer
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        wrap={"nowrap"}
      >
        <Grid item>CLANK</Grid>

        {navButtons.map((button) => (
          <ButtonDiv key={button.label}>
            <IconDiv>{getIcon(button.icon)}</IconDiv>
            <p>{button.label}</p>
          </ButtonDiv>
        ))}
      </DashboardNavContainer>
    );
  }
}
