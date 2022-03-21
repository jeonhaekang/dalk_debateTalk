import React from "react";
import ShopGachaAnnounce from "../components/mypage/ShopGachaAnnounce";
import UserInfo from "../components/mypage/UserInfo";
import NewHeader from "../shared/NewHeader"
import Convenience from "../components/mypage/Convenience";
import Grid from "../elements/Grid";
import styled from "styled-components";

const MyPage = (props) => {
  return (
    <>
      <Grid height="100vh" overflow="scroll">
        <NewHeader page="마이 페이지" />
        <UserInfo />
        <ShopGachaAnnounce />
        <Convenience />
      </Grid>
    </>
  )
};

export default MyPage;
