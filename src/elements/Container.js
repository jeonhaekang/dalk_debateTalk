import React from "react";
import styled from "styled-components";

const ContentContainer = ({ children, mobile, ...props }) => {
  // 모바일 환경에서 100vh가 적용이 안될때가 있음, 오류 해결을 위한 함수
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  // 브라우저 창 크기를 변경시 다시 계산
  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (mobile) {
    return <MobileContainer style={{ ...props }}>{children}</MobileContainer>;
  }
  return <Container style={{ ...props }}>{children}</Container>;
};

const Container = styled.div`
  /* height: calc(var(--vh) * 100 - 146px); */
  /* overflow-y: scroll; */
  margin-bottom: 76px;
`;

const MobileContainer = styled.div`
  height: calc(var(--vh) * 100 - 146px);
  position: relative;

  overflow-x: hidden;
`;

export default ContentContainer;
