import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import apis from "../../shared/apis";

const PostListCategory = () => {

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

  const delay = 30;
  const onThrottleDragMove = throttle(onDragMove, delay); 

  const CategoryList = [
    "전체보기",
    "연애",
    "정치",
    "게임",
    "음식",
    "유머",
    "헬프",
    "망상",
    "운동",
    "기타",
  ];

  return (
    <CategoryScroll
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}>
      {CategoryList.map((c, idx) => {return <CategoryBtn key={idx} onClick={() => history.replace("/postlist/" + c)}>#{c}</CategoryBtn>})}
    </CategoryScroll>
  )
};

const CategoryScroll = styled.div`
display:flex;
white-space: nowrap;
overflow-x: scroll;
`
const CategoryBtn = styled.button`
padding: 8px;
margin-right: 5px;
border: none;
border-radius: 10px;
`


export default PostListCategory;