import { useEffect } from "react";
import styled from "styled-components";
import backgroundImage from "../../image/shared/background.jpg";

const MobileFrame = ({ children }) => {
  // 모바일 환경에서 100vh가 적용이 안될때가 있음, 오류 해결을 위한 함수
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  // 브라우저 창 크기를 변경시 다시 계산
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MobileContainer>
      <MobileWrap id="globalPortal">
        <MobileContent>{children}</MobileContent>
      </MobileWrap>
    </MobileContainer>
  );
};

const MobileContainer = styled.div`
  background-color: #eee;
  background-size: cover;
  background-repeat: no-repeat;

  height: calc(var(--vh) * 100);

  @media screen and (min-width: 430px) {
    background-image: url(${backgroundImage});
  }
`;

const MobileWrap = styled.div`
  width: 100%;
  height: 100%;
  max-width: 430px;
  background-color: white;

  margin: 0 auto;

  @media screen and (min-width: 1024px) {
    transform: translateX(70%);
  }

  position: relative;
`;

const MobileContent = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  overflow: hidden;
`;

export default MobileFrame;
