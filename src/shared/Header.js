import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import { history } from "../redux/configStore";
import TestLogo from "../image/testlogo.jpeg";
import ReactModal from "react-modal";

const Header = (props) => {
  const { page } = props;
  const [modalState, setModalState] = React.useState(false);
  console.log(page);
  return (
    <HeaderContainer>
      <Grid position="relative" width="100%">
        {/* 페이지가 메인이면 햄버거 버튼 아니면 뒤로가기 버튼 */}
        <Grid position="absolute" left="0" top="0" height="100%">
          {page === "메인" ? (
            <Button onClick={() => setModalState(true)}>햄버거</Button>
          ) : (
            <Button onClick={() => history.goBack()}>뒤로가기</Button>
          )}
        </Grid>

        {/* 페이지가 메인이면 로고 이미지 출력 아니면 텍스트 출력 */}
        <Grid
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          {page === "메인" ? <Logo src={TestLogo} /> : page}
        </Grid>
      </Grid>
      <ReactModal
        isOpen={modalState}
        ariaHideApp={false}
        onRequestClose={() => setModalState(false)}
      ></ReactModal>
    </HeaderContainer>
  );
};

Header.defaultProps = {};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  height: 50px;
  background-color: gray;
  display: flex;
  padding: 10px;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

export default Header;
