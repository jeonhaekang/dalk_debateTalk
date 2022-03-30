import React from "react";
import styled from "styled-components";

import WarnUser from "../components/admin/WarnUser";
import BlindRoom from "../components/admin/BlindRoom";
import BlindBoard from "../components/admin/BlindBoard";
import Notice from "../components/admin/Notice";
import GivePoint from "../components/admin/GivePoint";
import WarnComment from "../components/admin/WarnComment";
import Banner from "../components/admin/Banner";

const Admin = () => {
  return (
    <AdminWrap>
      <BlindBoard />
      <BlindRoom />
      <WarnUser />
      <Notice />
      <GivePoint />
      <WarnComment />
      <Banner />
    </AdminWrap>
  );
};

const AdminWrap = styled.div`
  height: 100%;
  background-color: #fff;
  overflow: scroll;
`;

export default Admin;
