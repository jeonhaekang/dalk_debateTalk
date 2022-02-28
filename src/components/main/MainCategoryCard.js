import React from "react";
import styled from "styled-components";

const MainCategoryCard = (props) => {
  return <CardWrap>카테고리</CardWrap>;
};

MainCategoryCard.defaultProps = {};

const CardWrap = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eee;
  border: 3px solid black;
  flex: 0 0 auto;
  // flex: flex-grow, flex-shrink, flex-basis
  // flex-grow : flexitem확장 관련 0이면 컨테이너 크기가 커져도 아이템 크기가 커지지 않음
  // flex-shrink : flexitem의 축소 관련 0이면 컨테이너가 작아져도 아이템 크기가 줄어들지 않음
  // flex : flexitem의 기본 크기를 결정하는 속성

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MainCategoryCard;
