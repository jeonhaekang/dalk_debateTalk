import React from "react";
import ShopGachaAnnounce from "../components/mypage/ShopGachaAnnounce";
import UserInfo from "../components/mypage/UserInfo";
import NewHeader from "../shared/NewHeader";
import Convenience from "../components/mypage/Convenience";
import Grid from "../elements/Grid";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";
import ContentContainer from "../elements/Container";

const MyPage = (props) => {
  return (
    <>
      <NewHeader line page="마이 페이지" />
      <ContentContainer Xfooter>
        <FlexGrid is_column gap="0px">
          <UserInfo />
          <ShopGachaAnnounce />
          <Convenience />
        </FlexGrid>
      </ContentContainer>
    </>
  );
};

export default MyPage;
