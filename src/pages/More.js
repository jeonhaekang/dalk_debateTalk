import Header from "../shared/Header";
import Footer from "../shared/Footer";
import React from "react";
import { useDispatch } from "react-redux";
import FlexGrid from "../elements/FlexGrid";
import Container from "../elements/Container";
import categoryDate from "../data/categoryData";
import Text from "../elements/Text";
import MoreContent from "../components/more/MoreContent";
import MoreHeader from "../components/more/MoreHeader";
import styled from "styled-components";
import { actionCreators } from "../redux/modules/infinityScroll";
import Refresh from "../elements/Refresh";

const More = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState("전체");
  const [idx, setIdx] = React.useState(0);

  const refresh = () => {
    dispatch(actionCreators.refresh(category));
  };

  return (
    <>
      <Header page="토론리스트" line />
      <Container footer>
        <FlexGrid padding="16px" between alignItems="flex-end">
          <Text size="headline1" weight="medium" lineHeight="38px">
            실시간 HOT한 토론에
            <br />
            참여해보세요
          </Text>
          <Refresh onClick={refresh} />
        </FlexGrid>

        <MoreHeader
          category={category}
          setCategory={setCategory}
          idx={idx}
          setIdx={setIdx}
        />
        <FlexGrid gap="0">
          {categoryDate.map((el, i) => {
            return (
              <MoreContentBox idx={idx} key={i}>
                <MoreContent category={el.name} />
              </MoreContentBox>
            );
          })}
        </FlexGrid>
      </Container>
      <Footer />
    </>
  );
};
const MoreContentBox = styled.div`
  --idx: ${(props) => props.idx * -100}%;
  transform: translateX(var(--idx));
  transition: 0.3s;

  width: 100%;
  height: calc((var(--vh) * 100) - 302px);

  background-color: ${(props) => props.color};

  box-sizing: border-box;
  overflow-y: scroll;

  flex: 0 0 auto;
`;

export default More;
