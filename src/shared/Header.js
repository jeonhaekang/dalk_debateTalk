import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import Modal from "../components/shared/Modal";

import Center from "../elements/Center";
import Text from "../elements/Text";
import FlexGrid from "../elements/FlexGrid";
import SearchRoom from "../components/main/SearchChatRoom";
import { ReactComponent as SearchIcon } from "../image/header/search.svg";
import { ReactComponent as BackIcon } from "../image/header/arrow_back.svg";
import { ReactComponent as PersonIcon } from "../image/header/person.svg";
import { ReactComponent as MeatballIcon } from "../image/header/meatball.svg";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { page, children, meatball, color, line } = props;
  const [modalState, setModalState] = React.useState(false);
  const [searchState, setSearchState] = React.useState(false);
  const path = window.location.pathname;

  const userList = useSelector((state) => state.chat.currentRoom.users);

  if (path === "/") {
    return (
      <HeaderContainer>
        <Text color="orange" size="logo" weight="black">
          DALKING
        </Text>
        <Right onClick={() => setSearchState(true)}>
          <SearchIcon />
        </Right>
        {searchState && (
          <SearchRoom state={searchState} setState={setSearchState} />
        )}
      </HeaderContainer>
    );
  }
  return (
    <>
      {modalState && (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          type="hamburger"
        >
          {children}
        </Modal>
      )}
      <HeaderContainer line={line}>
        {/* 뒤로가기 버튼 */}
        <Left onClick={() => history.goBack()}>
          <BackIcon />
        </Left>

        <Center center>
          <FlexGrid center gap="0">
            <Text
              size="gnb"
              weight="regular"
              whiteSpace="nowrap"
              margin="0 4px 2px 0"
              color={color && "orange"}
            >
              {page}
            </Text>

            {path.includes("chatroom") && (
              <>
                <PersonIcon />
                <Text size="body1" weight="regular" marginBottom="2px">
                  {userList.length}
                </Text>
              </>
            )}
          </FlexGrid>
        </Center>

        {/* 토글 버튼 */}
        {meatball && (
          <Right onClick={() => setModalState(true)}>
            <MeatballIcon />
          </Right>
        )}
      </HeaderContainer>
    </>
  );
};

const Left = styled.div`
  position: absolute;
  left: 16px;

  cursor: pointer;
  display: flex;
`;

const Right = styled.div`
  position: absolute;
  right: 16px;

  cursor: pointer;
  display: flex;
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;

  width: 100%;
  height: 70px;

  background-color: white;

  z-index: 5;
  border-bottom: ${(props) => props.line && "1px solid #c4c4c4"};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;
