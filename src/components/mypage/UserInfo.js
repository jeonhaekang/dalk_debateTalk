import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import { discriminant, rank } from "../../data/rank";
import { actionCreators } from "../../redux/modules/user";
import arrowright from "../../image/mypage/arrowright.svg";

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userRank = rank[discriminant(user?.ex)];

  useEffect(() => {
    dispatch(actionCreators.logincheckDB())
  }, [])

  return (
    <>
      {user && (
        <UserInfoCard>
          <Radius>
            <LevelImg src={userRank.img} />
          </Radius>
          <MypageUser>
            <MyUserName>{user?.nickname} <span className="nim">님</span></MyUserName>
            <Grade>
              <MyLevel>{userRank.name}</MyLevel>
            </Grade>
          </MypageUser>
        </UserInfoCard>
      )}
      <MyEggPoint>
        <div style={{ fontSize: "18px", fontWeight: "500" }}>내 알포인트 </div>
        <MyRP>
          {user?.point.toLocaleString('ko-KR')}
          <RP>RP</RP>
        </MyRP>
        <div onClick={() => {
          history.push("/mypage/eggpoint");
        }} style={{ cursor: "pointer", display:"flex" }}>자세히보기 <img src={arrowright} style={{margin: "2px 0px 0px 4px"}}/></div>
      </MyEggPoint>
    </>
  );
};

const UserInfoCard = styled.div`
  display: flex;
  padding-top: 20px;
`;

const Radius = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  background-color: #FAFAFA;
  border-radius: 100%;
  margin: 0px 24px 0px 44px;
  box-shadow:inset 0 0 10px rgba(0, 0, 0, 0.05);
`
const LevelImg = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  transform: translate(15px, 15px);
`;

const MypageUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
`;

const MyUserName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.black};
  .nim{
    font-size: ${(props) => props.theme.fontSizes.body2};
  }
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MyLevel = styled.div`
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  color: ${(props) => props.theme.color.black};
`;

const MyEggPoint = styled.div`
  color: #686868;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 20px 20px;
  padding: 20px 10px;
  background-color: #FAEDE1;
  border-radius: 10px;
`;
const MyRP = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.orange};
  margin: 0px 25px 2px 0px;
`
const RP = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.black};
  margin: 10px 0px 0px 5px;
`

export default UserInfo;
