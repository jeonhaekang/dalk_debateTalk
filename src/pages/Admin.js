import React from "react";
import styled from "styled-components";
import Grid from "../elements/Grid"
import Header from '../shared/Header'
import MainCard from '../components/main/MainCard'

const Admin = (props) => {
  return (
    <>
      <Header />
      <Grid margin="30px 10px">
        {/* 신고 카운트가 기준치 넘으면 블라인드 목록으로 오게끔 */}
        <div>블라인드 게시글</div>
        <AdminMargin>
          <MainCard />
        </AdminMargin>

        <br />
        {/* 너무많다면? 페이지 수로 넘겨야할듯 */}
        <div>토론방 목록</div>
        <AdminMargin>
          <MainCard />
        </AdminMargin>
        <AdminMargin>
          <MainCard />
        </AdminMargin>


        <br />
        {/* 이것도 많으면 페이지 수로 넘겨야할듯 */}
        <Grid>
          불량 유저 목록
          <AdminList>
            <div>아이디</div>
            <div>신고수</div>
            <div>제제여부</div>
          </AdminList>
          <Log>
            <div>cmjj0824</div>
            <div>5 번</div>
            <OutBtn>추방하기</OutBtn>
          </Log>
          <Log>
            <div>cmjj0824</div>
            <div>5 번</div>
            <OutBtn>추방하기</OutBtn>
          </Log>
          <Log>
            <div>cmjj0824</div>
            <div>5 번</div>
            <OutBtn>추방하기</OutBtn>
          </Log>
        </Grid>



        <br />
        {/* 등록하면 formdata 형식으로 DB에 보내야되나? */}
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
