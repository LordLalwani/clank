import React from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  height: 100vh;
  background: #f0f4fb;
`;

export default class Dashboard extends React.Component {
  render() {
    return <DashboardContainer>dashboard</DashboardContainer>;
  }
}
