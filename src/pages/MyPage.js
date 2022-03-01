import React from "react";
import EggpointList from "../components/mypage/EggpointList"; 
import UserInfo from "../components/mypage/UserInfo";

const MyPage = (props) => {
  return (
    <>
    <UserInfo />
    <EggpointList />
    </>
  )
};

export default MyPage;
