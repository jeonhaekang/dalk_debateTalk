import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../../redux/modules/user";
import FlexGrid from "../../elements/FlexGrid";
import Badge from "../../elements/Badge";
import Text from "../../elements/Text";
import bronze from "../../image/rank/bronze.svg";

const TopRank = (props) => {
  const dispatch = useDispatch();
  const [rank, setRank] = React.useState();
  const [nickName, setNickName] = React.useState();

  const rankList = useSelector((state) => state.user.rankList);

  // rankList가 비어있으면 서버에서 데이터 가져옴
  React.useEffect(() => {
    if (rankList.length === 0) {
      dispatch(userAction.setRankListDB());
    }
  }, []);

  // 유저 랭킹 정보
  React.useEffect(() => {
    let count = 0;
    if (rankList.length !== 0) {
      setNickName(`${rankList[count].nickname}`);
      setRank(count + 1);
      count++;
    }
    // setInterval : 일정한 간격으로 콜백함수 호출
    const test = setInterval(() => {
      setNickName(`${rankList[count].nickname}`);
      setRank(count + 1);
      2 > count ? count++ : (count = 0);
    }, 3000);

    return () => {
      clearInterval(test);
    };
  }, [rankList]);

  return (
    <RankWrap center>
      <Rank key={nickName}>
        <FlexGrid gap="17px">
          <FlexGrid>{rank}위</FlexGrid>
          <FlexGrid gap="3px" center>
            <Badge src={bronze} />
            <Text>{nickName}</Text>
          </FlexGrid>
        </FlexGrid>
      </Rank>
    </RankWrap>
  );
};
const RankWrap = styled(FlexGrid)`
  background-color: #f1f1f1;
  height: 40px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  & * {
    color: #ff6d0d;
    white-space: nowrap;
  }
  overflow: hidden;
`;

const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 3;
  transform: none;
}
`;

const Rank = styled.div`
  animation: ${fadeIn} 0.4s;
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

TopRank.defaultProps = {
  userRankList: [],
};

export default TopRank;
