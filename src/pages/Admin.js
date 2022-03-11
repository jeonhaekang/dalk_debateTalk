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
  const BannerList = useSelector(state => state.banner.BannerList)
  const carouselId = BannerList.map((b, idx) => b.carouselId);
  // const carouselId = BannerList[0].carouselId

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bannerActions.getBannerDB())
  }, [])

  const [selectedFile, setSelectedFile] = useState();

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleAddBanner = () => {
    const image = new FormData();
    image.append('image', selectedFile);
    dispatch(bannerActions.addBannerDB(image));
    selectedFile();
  }

  const handleDelBanner = () => {
    dispatch(bannerActions.delBannerDB(carouselId))
  }

  return (
    <>
      <Grid margin="30px 10px" height="100%" overflow="scroll">
        <BlindBoard />
        <BlindRoom />
        <WarnUser />

        <Grid>
          <Title>메인 배너 리스트</Title>
          <Grid margin="10px" display="flex" flexDirection="column">
            <AdminList>
              <div>배너 파일</div>
              <input type="file" onChange={handleFileInput}></input>
              <AddBannerBtn onClick={handleAddBanner}>등록</AddBannerBtn>
            </AdminList>
            {BannerList.map((b, idx) => {
              return <Log key={idx}>
                <img src={b.image}></img>
                <Grid display="flex" gap="10px" justifyContent="center" padding="5px">
                  {idx + 1}번 캐러셀 이미지
                  <OutBtn onClick={handleDelBanner}>삭제</OutBtn>
                </Grid>
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
const AddBannerBtn = styled.button`
  background-color: #ccc;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 35px;
  font-size: 12px;
  text-align: center;
`
const Title = styled.div`
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
`
const Log = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`
const OutBtn = styled.div`
  color: #ff0000;
  font-weight: bold;
  cursor: pointer;
`

export default Admin;
