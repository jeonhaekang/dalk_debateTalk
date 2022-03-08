import React from "react";
import styled from "styled-components";
import Center from "../elements/Center";
import FlexGrid from "../elements/FlexGrid";
import Grid from "../elements/Grid";

const Spinner = () => {
  return (
    <Outter center is_flex>
      <Img center is_flex>
        debate
      </Img>
    </Outter>
  );
};

const Outter = styled(FlexGrid)`
  position: absolute;
  top: 0;
  height: 100vh;
  z-index: 999;
  background-color: white;
`;

const Img = styled(FlexGrid)`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: gray;
`;

export default Spinner;
