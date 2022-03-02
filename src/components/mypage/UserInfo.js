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
                    <MyUserName>cmjj0824</MyUserName>
                    <MyLevel>LV 1</MyLevel>
                </MypageUser>
            </UserInfoCard>
            <MyEggPoint> 보유 알포인트 0 ©</MyEggPoint>
        </>
    )
};

const UserInfoCard = styled.div`
  display: flex;
  margin: 30px 0px 30px 70px;
`

const LevelImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin:0 12px 0 20px ;
`

const MypageUser = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;

`

const MyUserName = styled.div`
  font-size: 24px;
  font-weight: bold;
` 

const MyLevel = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
`

const MyEggPoint = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  
`

export default UserInfo;