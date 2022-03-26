import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bannerActions } from "../redux/modules/banner";

import Grid from "../elements/Grid";

import WarnUser from "../components/admin/WarnUser";
import BlindRoom from "../components/admin/BlindRoom";
import BlindBoard from "../components/admin/BlindBoard";
import Notice from "../components/admin/Notice";
import GivePoint from "../components/admin/GivePoint";

const Admin = () => {
  const BannerList = useSelector((state) => state.banner.BannerList);

  const dispatch = useDispatch();

  const [url, setUrl] = useState("");

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    dispatch(bannerActions.getBannerDB());
  }, []);

  const [selectedFile, setSelectedFile] = useState();

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddBanner = () => {
    dispatch(bannerActions.addBannerDB(selectedFile, url));
  };

  const handleDelBanner = (carouselId) => {
    dispatch(bannerActions.delBannerDB(carouselId));
  };

  return (
    <AdminWrap>
      <Grid padding="30px 10px">
        <BlindBoard />
        <BlindRoom />
        <WarnUser />
        <Notice />
        <GivePoint />

        <Grid>
          <Title>메인 배너 리스트</Title>
          <Grid margin="10px" display="flex" flexDirection="column">
            <AdminList>
              <div>배너 파일</div>
              <input type="file" onChange={handleFileInput}></input>
            </AdminList>
            <div>
              Url 경로
              <input type="text" onChange={handleUrl} value={url} />
              <AddBannerBtn onClick={handleAddBanner}>등록</AddBannerBtn>
            </div>
            {BannerList.map((b, idx) => {
              return (
                <Log key={idx}>
                  <img src={b.image} />
                  <Grid
                    display="flex"
                    gap="10px"
                    justifyContent="center"
                    padding="5px"
                  >
                    {idx + 1}번 캐러셀 이미지
                    <OutBtn onClick={() => handleDelBanner(b.carouselId)}>
                      삭제
                    </OutBtn>
                  </Grid>
                </Log>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </AdminWrap>
  );
};

const AdminWrap = styled.div`
  height: 100%;
  background-color: #fff;
  overflow: scroll;
`;

const AdminList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
const AddBannerBtn = styled.button`
  background-color: #ccc;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 35px;
  font-size: 12px;
  text-align: center;
`;
const Title = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
`;
const Log = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const OutBtn = styled.div`
  color: #ff0000;
  font-weight: bold;
  cursor: pointer;
`;

export default Admin;
