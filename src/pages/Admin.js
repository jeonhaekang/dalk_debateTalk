import React, { useEffect, useState } from "react";
import styled from "styled-components";

import WarnUser from "../components/admin/WarnUser";
import BlindRoom from "../components/admin/BlindRoom";
import BlindBoard from "../components/admin/BlindBoard";
import Notice from "../components/admin/Notice";
import GivePoint from "../components/admin/GivePoint";
import WarnComment from "../components/admin/WarnComment";
import Banner from "../components/admin/Banner";
import { useSelector } from "react-redux";
import { history } from "../redux/configStore";

const Admin = () => {
  const user = useSelector((store) => store.user.user?.role);
  
  const [admin, setAdmin] = useState(false);
  
  useEffect(() => {
    if (user) user === "ADMIN" ? setAdmin(true) : history.goBack();
  }, [user]);

  return (
    <AdminWrap>
      {admin && (
        <>
          <BlindBoard />
          <BlindRoom />
          <WarnUser />
          <Notice />
          <GivePoint />
          <WarnComment />
          <Banner />
        </>
      )}
    </AdminWrap>
  );
};

const AdminWrap = styled.div`
  height: 100%;
  background-color: #fff;
  overflow: scroll;
`;

export default Admin;
