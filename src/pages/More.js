import Header from "../shared/Header";
import Footer from "../shared/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexGrid from "../elements/FlexGrid";
import ContentContainer from "../elements/Container";
import categoryDate from "../data/categoryData";
import Text from "../elements/Text";
import MoreContent from "../components/more/MoreContent";
import MoreHeader from "../components/more/MoreHeader";
import styled from "styled-components";

const More = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState("전체");
  const [idx, setIdx] = React.useState(0);

  return (
    <>
      <Header page="토론리스트" />
      <ContentContainer>
        <FlexGrid padding="16px" height="108px">
          <Text size="headline1" weight="medium" lineHeight="38px">
            실시간 HOT한 토론에
            <br />
            참여해보세요
          </Text>
        </FlexGrid>
        <MoreHeader
          category={category}
          setCategory={setCategory}
          idx={idx}
          setIdx={setIdx}
        />
        <TestWrap>
          {categoryDate.map((el, i) => {
            return (
              <Test idx={idx} key={i}>
                <MoreContent category={el.name} />
              </Test>
            );
          })}
        </TestWrap>
      </ContentContainer>
      <Footer />
    </>
  );
};
const Test = styled.div`
  --idx: ${(props) => props.idx * -100}%;
  transform: translateX(var(--idx));
  transition: 0.3s;

  width: 100%;
  height: calc(100vh - 302px);

  background-color: ${(props) => props.color};

  box-sizing: border-box;
  overflow-y: scroll;

  flex: 0 0 auto;
`;

const TestWrap = styled.div`
  display: flex;

  width: 100%;
  flex-grow: 1;
`;

export default More;
