import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import loadingSpinner from "../image/shared/loadingSpinner.svg"

const InfinityScroll = ({ children, callNext, paging }) => {
  //스피너 Ref
  const spinnerRef = useRef(null);
  //스크롤바닥에 닫으면 감지해주는 옵저버 (IntersectionObserver(callback[,option]))
  //option으로 isIntersecting(page수가 올라가면 감지)을 넣었습니다.
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      //여기서 callNext는 post 리덕스의 page입니다
      callNext();
    }
  });

  //첫 페이지에 아무것도 없다면 useEffct 실행안됩니다.
  //여기서 paging은 post 리덕스의 has_next(다음으로 넘어가냐?)입니다.
  //즉, has_next가 true가 될 때 마다 useEffct가 업데이트되는 구조.
  //다음페이지(리덕스의 page+1, has_next: true)로 넘어갈때 마다 옵저빙이 실행됩니다.
  //스피너, 옵저버 끝단 확인시 옵저빙도 종료됩니다. (unobserve)
  useEffect(() => {
    if (paging.next === false) return;
    if (!spinnerRef.current) return;

    handleObserver.observe(spinnerRef.current);

    return () => {
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current);
    };
  }, [paging]);

  return (
    <>
      {children}
      {paging.next && (
        <LoadingSpinner ref={spinnerRef}>
          <img className="loading" src={loadingSpinner} alt="loadingSpinner"/>
        </LoadingSpinner>
      )}
    </>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
};

const rotator =keyframes`
  0% {
      transform: rotate(-45deg) translateZ(0);
  }
  100% {
      transform: rotate(315deg) translateZ(0);
  }
`;

const LoadingSpinner = styled.div`
  width: 100%;
  text-align: center;
  .loading{
    width: 50px;
    height: 50px;
    animation: ${rotator};
    animation-iteration-count: infinite;
    animation-duration: 3s;
  }
`;

export default InfinityScroll;
