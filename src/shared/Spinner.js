import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";
import logo from "../image/shared/spinnerLogo.svg";
import Portal from "./Portal";

const Spinner = () => {
  const is_loaded = useSelector((props) => props.spinner.is_loaded);
  console.log(is_loaded);

  if (is_loaded)
    return (
      <Portal>
        <SpinnerBox center is_flex>
          <img src={logo} alt="spinner" />
        </SpinnerBox>
      </Portal>
    );
  else return null;
};

const SpinnerBox = styled(FlexGrid)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1;
  background-color: white;
`;

export default Spinner;
