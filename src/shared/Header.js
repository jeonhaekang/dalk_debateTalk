import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import { history } from "../redux/configStore";
import TestLogo from "../image/testlogo.jpeg";
import Modal from "../components/shared/Modal";
import { IoChevronBackOutline } from "react-icons/io5";
import { AiFillAlert } from "react-icons/ai";

const Header = (props) => {
  const { page, report } = props;
  const [modalState, setModalState] = React.useState(false);

  return (
    <HeaderContainer>
      <Grid position="relative" width="100%">
        {/* 햄버거 모달 */}
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          type="hamburger"
        >
          <Grid
            position="absolute"
            left="50%"
            top="30%"
            transform="translate(-50%)"
          >
            <Logo src={TestLogo} />
          </Grid>
          <Grid
            position="absolute"
            bottom="0"
            display="flex"
            flexDirection="column"
            gap="10px"
            padding="15px"
            fontSize="20px"
            cursor="pointer"
          >
            <Grid>로그인</Grid>
            <Grid>회원가입</Grid>
            <Grid>마이페이지</Grid>
            <Grid>토론리스트</Grid>
          </Grid>
        </Modal>

        {/* 페이지에 따른 뒤로가기 버튼 및 신고버튼 */}
        <Grid
          display="flex"
          justifyContent="space-between"
          fontSize="30px"
          alignItems="center"
          height="100%"
        >
          <div>
            <IoChevronBackOutline />
          </div>
          {report && (
            <div>
              <AiFillAlert />
            </div>
          )}
        </Grid>

        {/* 페이지가 메인이면 로고 이미지 출력 아니면 텍스트 출력 */}
        <Grid
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          fontSize="26px"
        >
          {page === "메인" ? <Logo src={TestLogo} /> : page}
        </Grid>
      </Grid>
    </HeaderContainer>
  );
};

Header.defaultProps = {};
const BackButton = styled.div`
  font-size: 26px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 80px;
  display: flex;
  z-index: 999;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

export default Header;
