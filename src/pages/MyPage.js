import React from "react";
import ShopGachaAnnounce from "../components/mypage/ShopGachaAnnounce";
import UserInfo from "../components/mypage/UserInfo";
import Header from "../shared/Header";
import Convenience from "../components/mypage/Convenience";
import FlexGrid from "../elements/FlexGrid";
import Container from "../elements/Container";

const MyPage = () => {
  return (
    <>
      <Header line page="마이 페이지" />
      <Container>
        <FlexGrid is_column gap="0px">
          <UserInfo />
          <ShopGachaAnnounce />
          <Convenience />
        </FlexGrid>
      </Container>
    </>
  );
};

export default MyPage;
