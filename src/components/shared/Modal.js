import React from "react";
import styled, { keyframes } from "styled-components";

const Modal = (props) => {
  const { modalState, setModalState, children, type, top } = props;
  const [aniState, setAniState] = React.useState(false);

  const modalRef = React.useRef();

  const handleClickOutSide = (event) => {
    // ModalLayout부분 클릭시 모달창 닫힘
    if (modalRef.current === event.target) {
      setAniState(true);
      setTimeout(() => {
        setAniState(false);
        setModalState(false);
      }, 200);
    }
  };

  const close = () => {
    setAniState(true);
    setTimeout(() => {
      setAniState(false);
      setModalState(false);
    }, 200);
  };

  // click이벤트 연결
  React.useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  // 햄버거 만들었는데 디자이너님이 지웠어요..ㅠㅠㅠ
  if (type === "hamburger") {
    return (
      <ModalLayout
        ref={modalRef}
        modalState={modalState}
        aniState={aniState}
        top={top}
      >
        <HambergerContents aniState={aniState}>{children}</HambergerContents>
      </ModalLayout>
    );
  }
  return (
    <ModalLayout ref={modalRef} modalState={modalState} aniState={aniState}>
      <CreateContents aniState={aniState}>
        <CloseBtn onClick={close}>
          <svg width="34" height="34" viewBox="0 0 34 34">
            <path
              d="M26.9168 9.08087L24.9193 7.08337L17.0002 15.0025L9.081 7.08337L7.0835 9.08087L15.0027 17L7.0835 24.9192L9.081 26.9167L17.0002 18.9975L24.9193 26.9167L26.9168 24.9192L18.9977 17L26.9168 9.08087Z"
              fill="#333333"
            />
          </svg>
        </CloseBtn>
        {children}
      </CreateContents>
    </ModalLayout>
  );
};
const CloseBtn = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 999;
`;

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
  background: rgba(238, 238, 238, 0.8);
  animation: ${(props) => (props.aniState ? fadeOut : fadeIn)} 0.2s;
  z-index: 998;
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

const HambergerContents = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: white;
  animation: ${(props) => (props.aniState ? slideOut : slideIn)} 0.4s;
`;

const CreateContents = styled.div`
  position: absolute;
  max-width: 80%;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-radius: 15px;
  background-color: white;
`;

export default Modal;
