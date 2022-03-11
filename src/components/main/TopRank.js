import React from "react";
import styled, { keyframes } from "styled-components";
import Grid from "../../elements/Grid";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../../redux/modules/user";

const TopRank = (props) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState();
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
    // setInterval : 일정한 간격으로 콜백함수 호출
    const test = setInterval(() => {
      setUserInfo(`${count + 1}위 ${rankList[count].nickname}`);
      2 > count ? count++ : (count = 0);
    }, 3000);

    return () => {
      clearInterval(test);
    };
  }, [rankList]);

  return (
    <Grid
      height="40px"
      backgroundColor="gray"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Rank key={userInfo}>{userInfo}</Rank>
    </Grid>
  );
};

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
`;

TopRank.defaultProps = {
  userRankList: [],
};

export default TopRank;
