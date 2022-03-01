import React from "react";
import styled from "styled-components";

const MainCategoryCard = (props) => {
  const [isDrag, setIsDrag] = React.useState(false);
  const [startX, setStartX] = React.useState();

  const scrollRef = React.useRef(null);

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
    // e.pageX : 문서의 왼쪽상단을 기준으로 마우스 위치의 X좌표 값
    // scrollRef.current.scrollLeft : 수평 스크롤바의 위치값
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
      // 실질적으로 움직여주는 부분
    }
  };
  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 30;
  const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <CategoryBox
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseLeave={onDragEnd}
    >
      <CardWrap>카테고리</CardWrap>
      <CardWrap>카테고리</CardWrap>
      <CardWrap>카테고리</CardWrap>
      <CardWrap>카테고리</CardWrap>
      <CardWrap>카테고리</CardWrap>
      <CardWrap>카테고리</CardWrap>
      <CardWrap>카테고리</CardWrap>
      <CardWrap>카테고리</CardWrap>
    </CategoryBox>
  );
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

const CategoryBox = styled.div`
  display: flex;
  flex-wrap: nowrap; // 넘쳐도 줄바꿈 X, white-space: no-wrap과 같은 효과
  overflow-x: scroll; // x축 넘치면 스크롤 생성
  gap: 10px;
`;

export default MainCategoryCard;
