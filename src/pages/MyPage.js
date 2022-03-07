import React from "react";
import styled from "styled-components";
import ShopGachaAnnounce from "../components/mypage/ShopGachaAnnounce";
import UserInfo from "../components/mypage/UserInfo";
import Header from "../shared/Header"
import Convenience from "../components/mypage/Convenience";
import Grid from "../elements/Grid";

const MyPage = (props) => {
  return (
    <>
      <Grid height="100vh" overflow="scroll">
        <Header />
        <UserInfo />
        <ShopGachaAnnounce />
        <Convenience />
      </Grid>
    </>
  )
};

export default MyPage;
