import React, {useState} from "react";
import styled from "styled-components";
import Grid from "../elements/Grid"
import MainCard from '../components/main/MainCard'
import WarnUser from "../components/admin/WarnUser";
import BlindRoom from "../components/admin/BlindRoom";
import BlindBoard from "../components/admin/BlindBoard";

const Admin = () => {
    const [BlindBoardList, setBlindBoardList] = useState([]);
    const [BlindRoomList, setBlindRoomList] = useState([]);
    const [WarnUserList, setWarnUserList] = useState([]);
    const [BannerList, setBannerList] = useState([]);




  return (
    <>
      <Grid margin="30px 10px">
        {/* 신고 카운트가 기준치 넘으면 블라인드 목록으로 오게끔 */}
        <div>블라인드 게시글</div>
        <AdminMargin>
          <BlindBoard />
        </AdminMargin>


        <div>토론방 목록</div>
        <AdminMargin>
          <BlindRoom />
        </AdminMargin>


          <div>불량 유저 목록</div>
          <AdminList>
              <WarnUser />
          </AdminList>


        {/* 등록하면 formdata 형식으로 DB에 보내기 */}
        <Grid>
          메인 배너 리스트
          <Grid margin="10px">
            <AdminList>
              <div>배너 파일</div>
              <input type="file"></input>
              <div style={{color:"#0000ff", fontWeight: "bold", cursor: "pointer"}}>등록</div>
            </AdminList>
            <Log>
              <div>OOO.jpg</div>
              <OutBtn>삭제</OutBtn>
            </Log>
            <Log>
              <div>OOO.jpg</div>
              <OutBtn>삭제</OutBtn>
            </Log>
            <Log>
              <div>OOO.jpg</div>
              <OutBtn>삭제</OutBtn>
            </Log>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};

const AdminMargin = styled.div`
  margin: 10px 0px;
`

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
