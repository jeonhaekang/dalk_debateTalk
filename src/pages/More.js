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

  console.log(category, idx);

  return (
    <>
      <Header page="토론리스트" />
      <ContentContainer>
        <FlexGrid is_column gap="0" height="100%">
          <Text size="headline1" weight="medium" lineHeight="38px">
            실시간 HOT한 토론에
            <br />
            참여해보세요
          </Text>
          <MoreHeader
            category={category}
            setCategory={setCategory}
            idx={idx}
            setIdx={setIdx}
          />
          {/* <MoreContent category={category} /> */}
          {/* <TestWrap>
            {categoryDate.map((el, i) => {
              return <Test idx={idx} key={i} color={el.color}></Test>;
            })}
          </TestWrap> */}
          <TestWrap>
            {categoryDate.map((el, i) => {
              return <Test idx={idx} key={i} color={el.color}></Test>;
            })}
          </TestWrap>
        </FlexGrid>
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
  height: 100%;
  background-color: ${(props) => props.color};
  flex: 0 0 auto;
`;

const TestWrap = styled.div`
  display: flex;

  /* border: 3px solid red; */
  height: 100%;
  width: 100%;
`;

const Frame = styled.div``;

export default More;
