import React from "react";
import styled from "styled-components";
import Modal from "../components/shared/Modal";
import CreateRoom from "../components/shared/CreateRoom";
import { history } from "../redux/configStore";
import Text from "../elements/Text";
import { loginCheck, loginAction } from "../modules/loginCheck";

const Footer = () => {
  const [createModalState, setCreateModalState] = React.useState(false);
  const path = window.location.pathname;

  return (
    <>
      <FixedNav>
        <Icon onClick={() => history.push("/")}>
        <svg width="30" height="30" viewBox="0 0 38 38">
            <path
              d="M15.3966 30.7871V22.8704H21.7299V30.7871C21.7299 31.6579 22.4424 32.3704 23.3133 32.3704H28.0633C28.9341 32.3704 29.6466 31.6579 29.6466 30.7871V19.7037H32.3383C33.0666 19.7037 33.4149 18.8012 32.8608 18.3262L19.6241 6.40373C19.0224 5.8654 18.1041 5.8654 17.5024 6.40373L4.26577 18.3262C3.72743 18.8012 4.05993 19.7037 4.78827 19.7037H7.47993V30.7871C7.47993 31.6579 8.19243 32.3704 9.06327 32.3704H13.8133C14.6841 32.3704 15.3966 31.6579 15.3966 30.7871Z"
              fill={path === "/" ? "#F19121" : "#CDCDCD"}
            />
          </svg>

          <Text>홈</Text>
        </Icon>
        <Icon onClick={() => history.push("/more")}>
          <svg width="30" height="30" viewBox="0 0 38 38">
            <path
              d="M31.5 9.50001H29.9167V22.1667C29.9167 23.0375 29.2042 23.75 28.3333 23.75H9.33333V25.3333C9.33333 27.075 10.7583 28.5 12.5 28.5H28.3333L34.6667 34.8333V12.6667C34.6667 10.925 33.2417 9.50001 31.5 9.50001ZM26.75 17.4167V6.33334C26.75 4.59167 25.325 3.16667 23.5833 3.16667H6.16667C4.425 3.16667 3 4.59167 3 6.33334V26.9167L9.33333 20.5833H23.5833C25.325 20.5833 26.75 19.1583 26.75 17.4167Z"
              fill={path === "/more" ? "#F19121" : "#CDCDCD"}
            />
          </svg>

          <Text>채팅방</Text>
        </Icon>

        <Icon onClick={() => history.push("/postlist")}>
        <svg width="30" height="30" viewBox="0 0 38 38">
            <path
              d="M22.4358 4.75H7.91667C6.175 4.75 4.75 6.175 4.75 7.91667V30.0833C4.75 31.825 6.175 33.25 7.91667 33.25H30.0833C31.825 33.25 33.25 31.825 33.25 30.0833V15.5642C33.25 14.725 32.9175 13.9175 32.3158 13.3317L24.6683 5.68417C24.0825 5.0825 23.275 4.75 22.4358 4.75ZM12.6667 23.75H25.3333C26.2042 23.75 26.9167 24.4625 26.9167 25.3333C26.9167 26.2042 26.2042 26.9167 25.3333 26.9167H12.6667C11.7958 26.9167 11.0833 26.2042 11.0833 25.3333C11.0833 24.4625 11.7958 23.75 12.6667 23.75ZM12.6667 17.4167H25.3333C26.2042 17.4167 26.9167 18.1292 26.9167 19C26.9167 19.8708 26.2042 20.5833 25.3333 20.5833H12.6667C11.7958 20.5833 11.0833 19.8708 11.0833 19C11.0833 18.1292 11.7958 17.4167 12.6667 17.4167ZM12.6667 11.0833H20.5833C21.4542 11.0833 22.1667 11.7958 22.1667 12.6667C22.1667 13.5375 21.4542 14.25 20.5833 14.25H12.6667C11.7958 14.25 11.0833 13.5375 11.0833 12.6667C11.0833 11.7958 11.7958 11.0833 12.6667 11.0833Z"
              fill={path === "/postlist" ? "#F19121" : "#CDCDCD"}
            />
          </svg>
          <Text>결과방</Text>
        </Icon>

        <Icon onClick={() => loginCheck("push", "/mypage")}>
        <svg width="30" height="30" viewBox="0 0 38 38">
            <path
              d="M18.9998 3.16667C10.2598 3.16667 3.1665 10.26 3.1665 19C3.1665 27.74 10.2598 34.8333 18.9998 34.8333C27.7398 34.8333 34.8332 27.74 34.8332 19C34.8332 10.26 27.7398 3.16667 18.9998 3.16667ZM18.9998 7.91667C21.6282 7.91667 23.7498 10.0383 23.7498 12.6667C23.7498 15.295 21.6282 17.4167 18.9998 17.4167C16.3715 17.4167 14.2498 15.295 14.2498 12.6667C14.2498 10.0383 16.3715 7.91667 18.9998 7.91667ZM18.9998 30.4C15.0415 30.4 11.5423 28.3733 9.49984 25.3017C9.54734 22.1508 15.8332 20.425 18.9998 20.425C22.1507 20.425 28.4523 22.1508 28.4998 25.3017C26.4573 28.3733 22.9582 30.4 18.9998 30.4Z"
              fill="#CDCDCD"
            />
          </svg>

          <Text>마이페이지</Text>
        </Icon>

        <Icon onClick={() => loginAction(() => setCreateModalState(true))}>
          <svg width="46" height="46" viewBox="0 0 46 46">
            <circle cx="23" cy="23" r="23" fill="#F19121" />
            <rect x="21" y="11" width="4" height="25" rx="2" fill="white" />
            <rect
              x="35"
              y="21"
              width="4"
              height="25"
              rx="2"
              transform="rotate(90 35 21)"
              fill="white"
            />
          </svg>
        </Icon>
      </FixedNav>
      <Modal modalState={createModalState} setModalState={setCreateModalState}>
        <CreateRoom />
      </Modal>
    </>
  );
};
const Icon = styled.div`
  width: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  gap: 0;
`;

const FixedNav = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 76px;
  border-top: 1px solid #c4c4c4;
  background-color: white;
  z-index: 900;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export default Footer;
