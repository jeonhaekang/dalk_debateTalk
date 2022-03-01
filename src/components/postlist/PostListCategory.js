import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../elements/Button";
import Grid from "../../elements/Grid";

const PostListCategory = (props) => {
  //ref로 스크롤 querySelector함
  const scrollRef = React.useRef(null);

  //드래그 상태값
  const [isDrag, setIsDrag] = useState(false);
  //x축 이동 상태값
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  //마우스 무브가 너무 많은 이벤트를 발생시켜 delay 시키는 쓰로틀 사용
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

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay); 

  return (
    <CategoryScroll
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}>
      <Button width="60px">전체</Button>
      <Button width="60px">#생활</Button>
      <Button width="60px">#연애</Button>
      <Button width="60px">#게임</Button>
      <Button width="60px">#정치</Button>
      <Button width="60px">#건강</Button>
      <Button width="60px">#사회</Button>
      <Button width="60px">#유머</Button>
    </CategoryScroll>
  )
};

const CategoryScroll = styled.div`
display:flex;
white-space: nowrap;
overflow-x: scroll;
`

export default PostListCategory;