import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

const CountDownTimer = ({ restTime }) => {
  const minutes = Math.floor(restTime / 60);
  const seconds = restTime % 60;

  return (
    <Timer>
      <Minutes>{minutes.toString().padStart(2, "0")}</Minutes> :
      <Seconds>{seconds.toString().padStart(2, "0")}</Seconds>
    </Timer>
  );
};

const Timer = styled.div`
  font-size: 36px;
  width: 110px;

  display: flex;
  justify-content: center;
`;

const Minutes = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
`;

const Seconds = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-start;
`;

export default CountDownTimer;
