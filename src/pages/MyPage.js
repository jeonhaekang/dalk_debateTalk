import React from "react";
import CustiomizeMe from "../components/mypage/CustomizeMe";
import EggpointList from "../components/mypage/EggpointList"; 
import UserInfo from "../components/mypage/UserInfo";
import ShareLink from "../components/shared/ShareLink";
import Header from "../shared/Header"

const MyPage = (props) => {
  return (
    <>
      <Header />
      <UserInfo />
      <EggpointList />
      <CustiomizeMe />
    </>
  )
};

export default MyPage;
