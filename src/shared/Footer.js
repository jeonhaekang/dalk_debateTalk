import React from "react";
import styled from "styled-components";
import Modal from "../components/shared/Modal";
import CreateRoom from "../components/shared/CreateRoom";
import { history } from "../redux/configStore";
import Text from "../elements/Text";
import create from "../image/shared/create.png";
import { loginCheck, loginAction } from "../modules/loginCheck";

const Footer = () => {
  const [createModalState, setCreateModalState] = React.useState(false);
  const path = window.location.pathname;

  return (
    <>
      <FixedNav>
        <Icon onClick={() => history.push("/")}>
          <svg width="38" height="38" viewBox="0 0 38 38">
            <path
              d="M15.3966 30.7871V22.8704H21.7299V30.7871C21.7299 31.6579 22.4424 32.3704 23.3133 32.3704H28.0633C28.9341 32.3704 29.6466 31.6579 29.6466 30.7871V19.7037H32.3383C33.0666 19.7037 33.4149 18.8012 32.8608 18.3262L19.6241 6.40373C19.0224 5.8654 18.1041 5.8654 17.5024 6.40373L4.26577 18.3262C3.72743 18.8012 4.05993 19.7037 4.78827 19.7037H7.47993V30.7871C7.47993 31.6579 8.19243 32.3704 9.06327 32.3704H13.8133C14.6841 32.3704 15.3966 31.6579 15.3966 30.7871Z"
              fill={path === "/" ? "#F19121" : "#CDCDCD"}
            />
          </svg>

          <Text>홈</Text>
        </Icon>
        <Icon onClick={() => history.push("/more")}>
          <svg width="38" height="38" viewBox="0 0 38 38">
            <path
              d="M31.5 9.50001H29.9167V22.1667C29.9167 23.0375 29.2042 23.75 28.3333 23.75H9.33333V25.3333C9.33333 27.075 10.7583 28.5 12.5 28.5H28.3333L34.6667 34.8333V12.6667C34.6667 10.925 33.2417 9.50001 31.5 9.50001ZM26.75 17.4167V6.33334C26.75 4.59167 25.325 3.16667 23.5833 3.16667H6.16667C4.425 3.16667 3 4.59167 3 6.33334V26.9167L9.33333 20.5833H23.5833C25.325 20.5833 26.75 19.1583 26.75 17.4167Z"
              fill={path === "/more" ? "#F19121" : "#CDCDCD"}
            />
          </svg>

          <Text>채팅방</Text>
        </Icon>

        <Icon onClick={() => history.push("/postlist")}>
          <svg width="38" height="38" viewBox="0 0 38 38">
            <path
              d="M22.4358 4.75H7.91667C6.175 4.75 4.75 6.175 4.75 7.91667V30.0833C4.75 31.825 6.175 33.25 7.91667 33.25H30.0833C31.825 33.25 33.25 31.825 33.25 30.0833V15.5642C33.25 14.725 32.9175 13.9175 32.3158 13.3317L24.6683 5.68417C24.0825 5.0825 23.275 4.75 22.4358 4.75ZM12.6667 23.75H25.3333C26.2042 23.75 26.9167 24.4625 26.9167 25.3333C26.9167 26.2042 26.2042 26.9167 25.3333 26.9167H12.6667C11.7958 26.9167 11.0833 26.2042 11.0833 25.3333C11.0833 24.4625 11.7958 23.75 12.6667 23.75ZM12.6667 17.4167H25.3333C26.2042 17.4167 26.9167 18.1292 26.9167 19C26.9167 19.8708 26.2042 20.5833 25.3333 20.5833H12.6667C11.7958 20.5833 11.0833 19.8708 11.0833 19C11.0833 18.1292 11.7958 17.4167 12.6667 17.4167ZM12.6667 11.0833H20.5833C21.4542 11.0833 22.1667 11.7958 22.1667 12.6667C22.1667 13.5375 21.4542 14.25 20.5833 14.25H12.6667C11.7958 14.25 11.0833 13.5375 11.0833 12.6667C11.0833 11.7958 11.7958 11.0833 12.6667 11.0833Z"
              fill={path === "/postlist" ? "#F19121" : "#CDCDCD"}
            />
          </svg>
          <Text>결과방</Text>
        </Icon>

        <Icon onClick={() => loginCheck("push", "/mypage")}>
          <svg width="38" height="38" viewBox="0 0 38 38">
            <path
              d="M18.6667 19C22.1658 19 25 16.1658 25 12.6667C25 9.16749 22.1658 6.33333 18.6667 6.33333C15.1675 6.33333 12.3333 9.16749 12.3333 12.6667C12.3333 16.1658 15.1675 19 18.6667 19ZM18.6667 9.49999C20.4083 9.49999 21.8333 10.925 21.8333 12.6667C21.8333 14.4083 20.4083 15.8333 18.6667 15.8333C16.925 15.8333 15.5 14.4083 15.5 12.6667C15.5 10.925 16.925 9.49999 18.6667 9.49999ZM18.6667 20.5833C14.4392 20.5833 6 22.705 6 26.9167V30.0833C6 30.9542 6.7125 31.6667 7.58333 31.6667H29.75C30.6208 31.6667 31.3333 30.9542 31.3333 30.0833V26.9167C31.3333 22.705 22.8942 20.5833 18.6667 20.5833ZM28.1667 28.5H9.16667V26.9325C9.48333 25.7925 14.3917 23.75 18.6667 23.75C22.9417 23.75 27.85 25.7925 28.1667 26.9167V28.5Z"
              fill={path === "/mypage" ? "#F19121" : "#CDCDCD"}
            />
          </svg>
          <Text>마이페이지</Text>
        </Icon>

        {/* <Icon onClick={() => setCreateModalState(true)}> */}
        <Icon onClick={() => loginAction(() => setCreateModalState(true))}>
          <CreateBtn src={create} />
        </Icon>
      </FixedNav>
      <Modal modalState={createModalState} setModalState={setCreateModalState}>
        <CreateRoom />
      </Modal>
    </>
  );
};
const Icon = styled.div`
  width: 61px;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0;
`;

const FixedNav = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 76px;
  border-top: 1px solid #c4c4c4;
  background-color: white;
  z-index: 990;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const CreateBtn = styled.button`
  width: 46px;
  height: 46px;
  background-size: cover;
  background-image: url("${(props) => props.src}");
  background-color: white;
  border: 0;
`;
export default Footer;
