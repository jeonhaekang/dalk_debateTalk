import React from "react";
import CustiomizeMe from "../components/mypage/CustomizeMe";
import ShopGachaAnnounce from "../components/mypage/ShopGachaAnnounce";
import UserInfo from "../components/mypage/UserInfo";
import Header from "../shared/Header"
import Footer from "../shared/Footer"

const MyPage = (props) => {
  return (
    <>
      <Header />
      <UserInfo />
      <ShopGachaAnnounce />
      <CustiomizeMe />
      <Footer />
    </>
  )
};

export default MyPage;
