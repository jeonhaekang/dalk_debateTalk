import React, { useState } from "react";
import Footer from "../shared/Footer";

import FlexGrid from "../elements/FlexGrid";

import Container from "../elements/Container";
import Text from "../elements/Text";

import styled from "styled-components";

import Header from "../shared/Header";
import BestContent from "../components/category/BestContent";
import CategoryContent from "../components/category/CategoryContent";
import { actionCreators } from "../redux/modules/infinityScroll";
import { useDispatch } from "react-redux";

const Category = (props) => {
  const dispatch = useDispatch();
  const category = props.match.params.category;

  const [time, setTime] = React.useState(new Date().getTime());

  const refresh = () => {
    setTime(new Date().getTime());
    dispatch(actionCreators.refresh(category));
  };

  return (
    <>
      <Header page={`#${category}`} color line />
      <Container footer>
        <BestContent category={category} time={time} refresh={refresh} />
        <ContentBox is_column>
          <FlexGrid
            is_column
            gap="8px"
            borderBottom="1px solid #c4c4c4"
            padding="21px 0 33px 0"
          >
            <Text size="headline2" weight="medium">
              엎치락 뒤치락 실시간 토론
            </Text>
            <Text>투표를 서둘러 주세요!</Text>
          </FlexGrid>
          <CategoryContent category={category} time={time} />
        </ContentBox>
      </Container>
      <Footer />
    </>
  );
};

const ContentBox = styled(FlexGrid)`
  padding: 16px;
  gap: 0;

  .moreBox {
    border-bottom: 1px solid #c4c4c4;
  }

  .moreBox:last-child {
    border: none;
  }
`;

export default Category;
