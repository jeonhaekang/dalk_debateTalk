import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../shared/Header";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../elements/Container";
import FlexGrid from "../../elements/FlexGrid";
import apis from "../../shared/apis";
import gachaData from "../../data/gachaData";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { actionCreators as userAction } from "../../redux/modules/user";
import {
  EggComponent,
  ResultConponent,
} from "../../components/mypage/GachaComponent";

const Gacha = (props) => {
  const dispatch = useDispatch();

  const [start, setStart] = useState(false);
  const [result, setResult] = useState(null);

  const user = useSelector((props) => props.user.user);

  const gachaStart = () => {
    if (user.lottoCount < 1) {
      dispatch(alertAction.open({ message: "모두 소진되었습니다." }));
      return;
    }
    setResult(null);
    setStart(true);
    dispatch(userAction.lottoCount());
    apis
      .Gacha()
      .then((res) => {
        setTimeout(() => {
          setResult({ ...gachaData[res.data.rank] });
        }, 2000);
      })
      .catch((err) => {
        dispatch(alertAction.open({ message: "모두 소진되었습니다." }));
      });
  };

  return (
    <>
      <Header page="행운뽑기" />
      <Container footer>
        <FlexGrid
          center
          height="100%"
          is_column
          size="headline1"
          weight="regular"
          textAlign="center"
        >
          {!result ? (
            <EggComponent start={start} />
          ) : (
            <ResultConponent setStart={setStart} result={result} />
          )}
        </FlexGrid>
      </Container>
      {start || user?.lottoCount < 1 ? (
        <BuyButton gray>행운뽑기</BuyButton>
      ) : (
        <BuyButton onClick={gachaStart}>
          {result ? "한번 더 뽑기" : "행운뽑기"}
        </BuyButton>
      )}
    </>
  );
};

export default Gacha;

const BuyButton = styled.button`
  height: 76px;
  width: 100%;
  border: none;
  background-color: ${(props) =>
    props.gray ? "#CBCBCB" : props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;

  cursor: pointer;
`;
