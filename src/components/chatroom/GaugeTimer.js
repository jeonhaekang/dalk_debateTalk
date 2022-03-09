import React from "react";
import styled from "styled-components";

const GaugeTimer = ({ restTime = 1200, time, ...props }) => {
  const per = (restTime / (time ? 1200 : 3600)) * 100;

  // page
  return (
    <GaugeOuter {...props}>
      <GaugeInner {...props} width={per} />
    </GaugeOuter>
  );
};

const GaugeOuter = styled.div`
  ${(props) =>
    props.page
      ? "border-radius:0px 0px 10px 10px; position:absolute; left:0; bottom:0;"
      : ""}
  height: 6px;
  width: 100%;
  background-color: #c4c4c4;
`;

const GaugeInner = styled.div.attrs((props) => ({
  style: {
    width: `${props.width}%`,
  },
}))`
  height: 100%;
  background-color: #ff4550;
  transition: 0.3s;
  ${(props) =>
    props.page
      ? "border-radius:0px 0px 0px 10px; position:absolute; left:0; bottom:0;"
      : ""}
`;

export default GaugeTimer;
