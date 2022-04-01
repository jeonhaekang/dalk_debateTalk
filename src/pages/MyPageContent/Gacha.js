import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../shared/Header";

import { useDispatch, useSelector } from "react-redux";
import Container from "../../elements/Container";

import { ReactComponent as Egg } from "../../image/gacha/egg.svg";
import { ReactComponent as Fail } from "../../image/gacha/fail.svg";
import { ReactComponent as Success } from "../../image/gacha/success.svg";
import { shake, broken, zoomIn, zoomOut } from "../../animation/gacha";
import FlexGrid from "../../elements/FlexGrid";

const Gacha = (props) => {
  const dispatch = useDispatch();

  const [start, setStart] = useState(false);

  return (
    <>
      <Header page="행운뽑기" />
      <Container footer>
        <FlexGrid center height="100%">
          <EggImage start={start ? 1 : 0} />
        </FlexGrid>
      </Container>
      <BuyButton>행운뽑기</BuyButton>
    </>
  );
};

const EggImage = styled(Egg)`
  animation: ${broken} 200ms infinite;
`;

const BuyButton = styled.button`
  height: 76px;
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;

  cursor: pointer;
`;

export default Gacha;
