import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Grid from "../elements/Grid"
import WarnUser from "../components/admin/WarnUser";
import BlindRoom from "../components/admin/BlindRoom";
import BlindBoard from "../components/admin/BlindBoard";
import { actionCreators as bannerActions } from "../redux/modules/banner";
import { useEffect } from "react";

const Admin = () => {
  const BannerList = useSelector(state => state.banner?.BannerList)
  const carouselId = BannerList?.carouselId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bannerActions.getBannerDB())
  }, [])

  const [selectedFile, setSelectedFile] = useState();
  console.log(selectedFile)

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleAddBanner = () => {
    const image = new FormData();
    image.append('image', selectedFile);
    console.log(image)
    dispatch(bannerActions.addBannerDB(image));
  }

  const handleDelBanner = () => {
    dispatch(bannerActions.delBannerDB(carouselId))
  }

  return (
    <>
      <Grid margin="30px 10px">
        <div>현재 블라인드 게시글</div>
        <BlindBoard />

        <div>현재 블라인드 토론방</div>
        <BlindRoom />

        <div>불량 유저 목록</div>
        <WarnUser />

        <Grid>
          메인 배너 리스트
          <Grid margin="10px">
            <AdminList>
              <div>배너 파일</div>
              <input type="file" onChange={handleFileInput}></input>
              <div onClick={handleAddBanner}>등록</div>
            </AdminList>
            {BannerList?.map((b, idx) => {
              return <Log key={idx}>
                <div>jpg이름</div>
                <OutBtn onClick={handleDelBanner}>삭제</OutBtn>
              </Log>
            })
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};

const AdminList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`

const Log = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`

const OutBtn = styled.div`
  color: #ff0000;
  font-weight: bold;
  cursor: pointer;
`

export default Admin;
