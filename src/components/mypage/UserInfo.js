import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import star from '../../image/star.png'

const UserInfo = (props) => {

    return (
        <>
            <UserInfoCard>
                <LevelImg src={star} />
                <MypageUser>
                    <MyUserName>닉네임</MyUserName>
                    <Grade>
                      <MyLevel>브론즈 1</MyLevel>
                      <GradeInfo>등급 더보기</GradeInfo>
                    </Grade>
                </MypageUser>
            </UserInfoCard>
            <MyEggPoint>
              <div>보유 알포인트 2,564</div>
              <div> > </div>
            </MyEggPoint>
        </>
    )
};

const UserInfoCard = styled.div`
  display: flex;
  padding: 30px 0px 0px 0px;
`

const LevelImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin:0px 12px 0px 20px ;
`

const MypageUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;

`

const MyUserName = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 6px;
  border-bottom: 3px solid #C4C4C4;
  color: #CFCFCF;
  
` 

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
`

const GradeInfo = styled.div`
  font-size: 16px;
  padding-top: 8px;
  padding-right: 12px;
  color: #CFCFCF;
`

const MyLevel = styled.div`
  color: #CFCFCF;
  font-size: 20px;
  padding-top: 5px;
`

const MyEggPoint = styled.div`
  font-size: 20px;
  color: #686868;
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  padding: 18px 20px;
  border-top: 1px solid #C4C4C4;
  border-bottom: 1px solid #C4C4C4;
  
`

export default UserInfo;