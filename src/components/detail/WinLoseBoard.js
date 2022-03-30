import React from "react";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";

import detailLogo from "../../image/detailElement/detaillogo.svg";
import detailLogoFill from "../../image/detailElement/detaillogofill.svg";
import eggFill from "../../image/detailElement/egg_fill.svg";
import personFill from "../../image/detailElement/person_fill.svg";
import thumbUpFill from "../../image/detailElement/thumb_up_black_fill.svg";
import trendingUpFill from "../../image/detailElement/trending_up_fill.svg";
import egg from "../../image/detailElement/egg.svg";
import person from "../../image/detailElement/person.svg";
import thumbUp from "../../image/detailElement/thumb_up_black.svg";
import trendingUp from "../../image/detailElement/trending_up.svg";

function WinLoseBoard({ debate, winnerRate, loserRate }) {
  return (
    <>
      <FlexGrid gap="0">
        <DebateBox win={true} is_column center gap="0px">
          <DetailLogo center gap="4px">
            <img src={detailLogoFill} alt="detaillogofill" />
            <div style={{ color: "#f19121" }}> WIN </div>
          </DetailLogo>
          <TitleBox win={true}>{debate.winnerResponse?.topic}</TitleBox>
          <DetailBox section={true}>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={eggFill} />
              <div style={{ color: "#F19121" }}>
                총 {debate.winnerResponse?.totalPoint} RP
              </div>
            </FlexGrid>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={thumbUpFill} />
              <div style={{ color: "#F19121" }}>
                최고 {debate.winnerResponse?.topPoint} RP
              </div>
            </FlexGrid>
          </DetailBox>
          <DetailBox section={false}>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={personFill} />
              <div style={{ color: "#F19121" }}>
                {debate.winnerResponse?.cnt}명 선택
              </div>
            </FlexGrid>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={trendingUpFill} />
              <div style={{ color: "#F19121" }}>
                배당 : {debate.winnerResponse?.rate}
              </div>
            </FlexGrid>
          </DetailBox>

          <GrapGauge which={true} rate={winnerRate} />
        </DebateBox>
        <DebateBox win={false} is_column center gap="0px">
          <DetailLogo center gap="4px">
            <img src={detailLogo} alt="detaillogo" />
            <div style={{ fontSize: "14px" }}> LOSE </div>
          </DetailLogo>
          <TitleBox win={false}>{debate.loserResponse?.topic}</TitleBox>
          <LoserDetailBox section={true}>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={egg} />
              <div>총 {debate.loserResponse?.totalPoint} RP</div>
            </FlexGrid>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={thumbUp} />
              <div>최고 {debate.loserResponse?.topPoint} RP</div>
            </FlexGrid>
          </LoserDetailBox>
          <LoserDetailBox section={false}>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={person} />
              <div>{debate.loserResponse?.cnt}명 선택</div>
            </FlexGrid>
            <FlexGrid gap="0px" width="150px" alignItems="center">
              <DetailImg src={trendingUp} />
              <div>배당 : {debate.loserResponse?.rate}</div>
            </FlexGrid>
          </LoserDetailBox>

          <GrapGauge which={false} rate={loserRate} />
        </DebateBox>
        <Versus center>VS</Versus>
      </FlexGrid>
    </>
  );
}

const DebateBox = styled(FlexGrid)`
  background-color: ${(props) =>
    props.win ? "#fefefe" : "rgba(196, 196, 196, 0.1)"};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  border: none;
  width: 50%;
  height: 232px;
  position: relative;
`;

const DetailLogo = styled(FlexGrid)`
  position: absolute;
  transform: translate(0px, -76px);
`;

const TitleBox = styled.div`
  font-size: ${(props) => (props.win ? "28px" : "24px")};
  padding: 8px;
  text-align: center;
  color: ${(props) => (props.win ? props.theme.color.orange : "")};
`;

const DetailBox = styled.div`
  position: absolute;
  transform: ${(props) =>
    props.section ? "translate(-10px, 66px)" : "translate(84px, 66px)"};
  font-size: 12px;
`;

const DetailImg = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const LoserDetailBox = styled.div`
  position: absolute;
  transform: ${(props) =>
    props.section ? "translate(0px, 66px)" : "translate(90px, 66px)"};
  font-size: 12px;
`;

const GrapGauge = styled.div`
  width: ${(props) => props.rate}%;
  height: 6px;

  background-color: ${(props) =>
    props.which ? props.theme.color.orange : "#c4c4c4"};
  display: flex;

  position: absolute;
  bottom: 0;

  ${(props) => (props.which ? "right:0" : "left:0")};
`;

const Versus = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  color: ${(props) => props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.black};
`;

export default WinLoseBoard;
