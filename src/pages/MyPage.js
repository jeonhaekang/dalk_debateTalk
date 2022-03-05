import React from "react";
import ShopGachaAnnounce from "../components/mypage/ShopGachaAnnounce";
import UserInfo from "../components/mypage/UserInfo";
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import Convenience from "../components/mypage/Convenience";

const MyPage = (props) => {
  return (
    <>
      <Header />
      <UserInfo />
      <ShopGachaAnnounce />
      <Convenience />
    </>
  )
};

export default MyPage;
