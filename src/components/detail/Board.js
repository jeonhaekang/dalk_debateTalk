import styled from "styled-components";
import { ReactComponent as LoserLogo } from "../../image/detailElement/loserlogo.svg";
import { ReactComponent as WinnerLogo } from "../../image/detailElement/winnerlogo.svg";
import { ReactComponent as Egg } from "../../image/detailElement/egg.svg";
import { ReactComponent as Person } from "../../image/detailElement/person.svg";
import { ReactComponent as ThumbUp } from "../../image/detailElement/thumb_up_black.svg";
import { ReactComponent as TrendingUp } from "../../image/detailElement/trending_up.svg";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

const Board = (props) => {
  const { winner, state, topic, cnt, rate, topPoint, totalPoint, totalCnt } =
    props;
  const voteRate = (cnt / totalCnt) * 100; // 득표율 계산

  const resultState = state === "무승부" || state === topic; // 무승부인지 승리했는지 판단

  return (
    <BoardContainer center resultState={resultState}>
      <ResultContainer center>
        {resultState ? (
          <>
            <WinnerLogo />
            <Text size="body3" weight="regular">
              {state === "무승부" ? "DRAW" : "WIN"}
            </Text>
          </>
        ) : (
          <>
            <LoserLogo />
            <Text size="body3" weight="regular" color="gray">
              LOSE
            </Text>
          </>
        )}
      </ResultContainer>
      <Topic>{topic}</Topic>
      <InfoContainer center>
        <Info>
          <Egg fill={resultState ? "#F19121" : "#333333"} />
          <Text size="body3" weight="regular">
            총 {totalPoint}RP
          </Text>
        </Info>
        <Info>
          <TrendingUp fill={resultState ? "#F19121" : "#333333"} />
          <Text size="body3" weight="regular">
            배율 {rate}
          </Text>
        </Info>
        <Info>
          <Person fill={resultState ? "#F19121" : "#333333"} />
          <Text size="body3" weight="regular">
            {cnt}명
          </Text>
        </Info>
        <Info>
          <ThumbUp fill={resultState ? "#F19121" : "#333333"} />
          <Text size="body3" weight="regular">
            최고 {topPoint}RP
          </Text>
        </Info>
      </InfoContainer>
      <Gague winner={winner} resultState={resultState} voteRate={voteRate} />
    </BoardContainer>
  );
};
const Gague = styled.div`
  position: absolute;
  bottom: 0;
  ${(props) => (props.winner ? "right: 0;" : "left: 0;")}
  height: 6px;
  width: ${(props) => props.voteRate + "%"};

  background-color: ${(props) => (props.resultState ? "#f19121" : "#e0e0e0")};
`;

const Topic = styled.div`
  max-width: 156px;
  word-wrap: break-word;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 28px;
`;

const BoardContainer = styled(FlexGrid)`
  height: 200px;
  position: relative;
  background-color: ${(props) =>
    !props.resultState ? "rgb(249,248,248)" : "white"};
  & * {
    color: ${(props) => props.resultState && props.theme.color.orange};
  }
`;

const InfoContainer = styled(FlexGrid)`
  position: absolute;
  bottom: 26px;

  flex-wrap: wrap;
  gap: 0;
  max-width: 168px;
`;

const Info = styled(FlexGrid)`
  width: calc(100% / 2);
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const ResultContainer = styled(FlexGrid)`
  position: absolute;
  top: 4px;
  gap: 0;
`;

export default Board;
