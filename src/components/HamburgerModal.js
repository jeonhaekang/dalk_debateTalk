import React from "react";
import styled, { keyframes } from "styled-components";

const HamburgerModal = (props) => {
  const { modalState, setModalState, children } = props;
  const [aniState, setAniState] = React.useState(false);

  const modalRef = React.useRef();

  const handleClickOutSide = (event) => {
    // ModalLayout부분 클릭시 모달창 닫힘
    if (modalRef.current === event.target) {
      setAniState(true);
      setTimeout(() => {
        setAniState(false);
        setModalState(false);
      }, 400);
    }
  };

  // click이벤트 연결
  React.useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <ModalLayout ref={modalRef} modalState={modalState} aniState={aniState}>
      <ModalContents aniState={aniState}>{children}</ModalContents>
    </ModalLayout>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalLayout = styled.div`
  display: ${(props) => (props.modalState ? "block" : "none")};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  animation: ${(props) => (props.aniState ? fadeOut : fadeIn)} 0.4s;
  z-index: 999;
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  from {
      transform: translate(0%);
  }
  to {
      transform: translateX(-100%);
  }
`;

const ModalContents = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: white;
  animation: ${(props) => (props.aniState ? slideOut : slideIn)} 0.4s;
  animation-fill-mode: forwards;
`;

export default HamburgerModal;
