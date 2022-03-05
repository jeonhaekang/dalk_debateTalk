import React from "react";
import styled from "styled-components";

const GaugeTimer = ({ restTime, time }) => {
  const per = (restTime / (time ? 1200 : 3600)) * 100;

  return (
    <GaugeOuter>
      <GaugeInner width={per} />
    </GaugeOuter>
  );
};

const GaugeOuter = styled.div`
  height: 6px;
  width: 100%;
  background-color: #c4c4c4;
`;

const GaugeInner = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #ff4550;
  transition: 0.3s;
`;

export default GaugeTimer;
