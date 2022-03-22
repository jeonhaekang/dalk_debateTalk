import React from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import { history } from "../redux/configStore";
import TestLogo from "../image/testlogo.jpeg";
import Modal from "../components/shared/Modal";
import { IoChevronBackOutline } from "react-icons/io5";
import { AiFillAlert } from "react-icons/ai";
import Center from "../elements/Center";

const Header = (props) => {
  const { page, report } = props;
  const [modalState, setModalState] = React.useState(false);

  return (
    <HeaderContainer>
      <Grid position="relative" width="100%">
        {/* 페이지에 따른 뒤로가기 버튼 및 신고버튼 */}
        <Grid
          display="flex"
          justifyContent="space-between"
          fontSize="30px"
          alignItems="center"
          height="100%"
        >
          {page !== "메인" && (
            <div onClick={() => history.goBack()}>
              <IoChevronBackOutline />
            </div>
          )}
          {report && (
            <div>
              <AiFillAlert />
            </div>
          )}
        </Grid>

        {/* 페이지가 메인이면 로고 이미지 출력 아니면 텍스트 출력 */}
        <Logo>{page === "메인" ? "DALKING" : page}</Logo>
      </Grid>
    </HeaderContainer>
  );
};

Header.defaultProps = {};

const HeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 70px;
  display: flex;
  background-color: white;
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  color: #f19121;
  font-weight: 900;
`;

export default Header;
