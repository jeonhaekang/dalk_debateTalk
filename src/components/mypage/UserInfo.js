import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import styled from "styled-components";
import { discriminant, rank } from "../../data/rank";

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userRank = rank[discriminant(user?.ex)];

  return (
    <>
      {user && (
        <UserInfoCard>
          <LevelImg src={userRank.img} />
          <MypageUser>
            <MyUserName>{user?.nickname}</MyUserName>
            <Grade>
              <MyLevel>{userRank.name}</MyLevel>
              <GradeInfo
                onClick={() => {
                  history.push("/mypage/grade");
                }}
              >
                등급 더보기
              </GradeInfo>
            </Grade>
          </MypageUser>
        </UserInfoCard>
      )}
      <MyEggPoint
        onClick={() => {
          history.push("/mypage/eggpoint");
        }}
      >
        <div style={{fontSize:"16px"}}>마이 알포인트 </div>
        <MyRP>{user?.point.toLocaleString('ko-KR')} RP</MyRP>
      </MyEggPoint>
    </>
  );
};

const UserInfoCard = styled.div`
  display: flex;
  padding-top: 20px;
`;

const LevelImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin: 0px 16px 0px 34px;
`;

const MypageUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
`;

const MyUserName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #cfcfcf;
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GradeInfo = styled.div`
  font-size: 12px;
  font-weight: ${(props) => props.theme.fontWeight.light};
  padding-top: 4px;
  padding-right: 20px;
  color: #cfcfcf;
  cursor: pointer;
`;

const MyLevel = styled.div`
  color: #cfcfcf;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  // padding-top: 5px;
`;

const MyEggPoint = styled.div`
  color: #686868;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 20px 0px;
  padding: 18px 20px;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  cursor: pointer;
  &:hover {
    border: 2px solid ${(props) => props.theme.color.orange};
  }
`;
const MyRP = styled.div`
  font-size: ${(props) => props.theme.fontSizes.gnb};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`

export default UserInfo;
