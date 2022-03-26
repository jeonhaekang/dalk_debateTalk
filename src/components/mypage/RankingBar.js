import styled from "styled-components";
import { rank, discriminant } from "../../data/rank";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import { grow, fade } from "../../animation/ranking";

const RankingBar = ({ topUser }) => {
  return (
    <FlexGrid gap="0" borderBottom="4px solid #EAEAEA" padding="0 40px">
      {topUser.map((el) => {
        const userRank = rank[discriminant(el.ex, el.rank)];
        return (
          <Frame is_column center key={el.rank}>
            <Info is_column center>
              <Text size="subtitle1" weight="medium" width="70px">
                {el.nickname}
              </Text>
              <Text size="body3">EXP{el.ex.toLocaleString()}</Text>
              <Img src={userRank.img} rank={el.rank} />
            </Info>
            <Bar
              color={userRank.color}
              height={userRank.height}
              rank={el.rank}
            />
          </Frame>
        );
      })}
    </FlexGrid>
  );
};
const Frame = styled(FlexGrid)`
  gap: 4px;
  justify-content: flex-end;
`;

const Info = styled(FlexGrid)`
  gap: 0;
  transform: translateY(40px);
  z-index: 1;
  text-align: center;

  animation: ${fade} 2s;
`;

const Img = styled.img`
  width: ${(props) => (props.rank === 1 ? "90px" : "68px")};
`;

const Bar = styled.div`
  position: relative;
  width: ${(props) => (props.rank === 1 ? "55px" : "49px")};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};

  transform-origin: bottom;
  animation: ${grow} 1s;
`;

export default RankingBar;
