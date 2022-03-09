import React from "react";
import styled, { keyframes } from "styled-components";
import Grid from "../../elements/Grid";

const TopRank = (props) => {
  const { userRankList } = props;
  const [userInfo, setUserInfo] = React.useState(
    `1위 ${userRankList[0].nickname}`
  );
  React.useEffect(() => {
    let count = 1;

    // setInterval : 일정한 간격으로 콜백함수 호출
    const test = setInterval(() => {
      setUserInfo(`${count + 1}위 ${userRankList[count].nickname}`);
      if (2 > count) count++;
      else count = 0;
    }, 3000);

    return () => {
      clearInterval(test);
    };
  }, []);

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
