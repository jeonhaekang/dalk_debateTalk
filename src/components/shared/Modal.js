import React from "react";
import styled, { keyframes } from "styled-components";
import Portal from "../../shared/Portal";

const Modal = (props) => {
  const { modalState, setModalState, children, type, top } = props;
  const [aniState, setAniState] = React.useState(false);

  const modalRef = React.useRef();
  const closeRef = React.useRef();

  const handleClickOutSide = React.useCallback((event) => {
    console.log("ddd");
    // ModalLayout부분 클릭시 모달창 닫힘
    const layout = modalRef.current === event.target;
    const close = closeRef.current === event.target;

    if (layout || close) {
      setAniState(true);

      setTimeout(() => {
        setModalState(false);
      }, 200);
    }
  }, []);

  // click이벤트 연결
  React.useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  if (type === "hamburger") {
    return (
      <Portal>
        <ModalLayout
          ref={modalRef}
          modalState={modalState}
          aniState={aniState}
          top={top}
        >
          <HambergerContents aniState={aniState}>{children}</HambergerContents>
        </ModalLayout>
      </Portal>
    );
  }
  return (
    <Portal>
      <ModalLayout ref={modalRef} modalState={modalState} aniState={aniState}>
        <CreateContents aniState={aniState}>
          <CloseBtn ref={closeRef}>
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
    </Portal>
  );
};
const CloseBtn = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 1;

  & * {
    //하위 요소 클릭 막음
    pointer-events: none;
  }
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
  height: 100%;
  background: rgba(238, 238, 238, 0.8);
  animation: ${(props) => (props.aniState ? fadeOut : fadeIn)} 0.2s;

  overflow: hidden;
`;

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const slideOut = keyframes`
  from {
      transform: translateY(0%);
  }
  to {
      transform: translateY(100%);
  }
`;

const HambergerContents = styled.div`
  position: absolute;
  width: 100%;

  left: 0;
  bottom: 0;
  background-color: #f1f1f1;
  border-radius: 15px 15px 0 0;
  animation: ${(props) => (props.aniState ? slideOut : slideIn)} 0.4s;

  & div {
    width: 100%;
    height: 82px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSizes.headline2};
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }

  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  padding: 16px;
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
