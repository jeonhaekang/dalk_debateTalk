import React from "react";
import FlexGrid from "../../elements/FlexGrid";
import styled from "styled-components";
import Text from "../../elements/Text";
import MainCard from "../../components/main/MainCard";
import apis from "../../shared/apis";
import reset from "../../image/shared/reset.svg";
import pinkReset from "../../image/shared/pinkReset.svg";
import Refresh from "../../elements/Refresh";

const BestContent = ({ category, time, refresh }) => {
  const [most, setMost] = React.useState();
  React.useEffect(() => {
    apis
      .categoryBest(category)
      .then((res) => {
        setMost(res.data);
      })
      .catch((err) => {
        // console.log(err.response);
      });
  }, [time]);

  return (
    <>
      {most && (
        <BestBox is_column>
          <FlexGrid between>
            <Text size="headline1" weight="medium" lineHeight="38px">
              실시간 베스트 토론
            </Text>
            <Refresh onClick={refresh} />
          </FlexGrid>
          {most && <MainCard key={most.roomId} {...most} page="main" />}
        </BestBox>
      )}
    </>
  );
};

export default BestContent;

const BestBox = styled(FlexGrid)`
  background-color: #faede1;
  padding: 24px;
  gap: 23px;
  border-radius: 0 0 15px 15px;
`;
