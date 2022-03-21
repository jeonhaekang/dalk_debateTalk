import React from "react";
import FlexGrid from "../../elements/FlexGrid";
import styled from "styled-components";
import Text from "../../elements/Text";
import MainCard from "../../components/main/MainCard";
import apis from "../../shared/apis";

const BestContent = ({ category }) => {
  const [most, setMost] = React.useState();

  React.useEffect(() => {
    apis
      .categoryBest(category)
      .then((res) => {
        console.log(res.data);
        setMost(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <BestBox is_column>
      <Text size="headline1" weight="medium" lineHeight="38px">
        실시간 베스트 토론
      </Text>
      {most && <MainCard {...most} page="main" />}
    </BestBox>
  );
};

export default BestContent;

const BestBox = styled(FlexGrid)`
  background-color: #faede1;
  padding: 24px;
  gap: 23px;
  border-radius: 0 0 15px 15px;
`;
