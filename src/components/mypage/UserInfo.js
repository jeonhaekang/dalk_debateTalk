import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import { actionCreators } from "../../redux/modules/user";

import { discriminant, rank } from "../../data/rank";

import arrowright from "../../image/mypage/arrowright.svg";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userRank = rank[discriminant(user?.ex)];

  useEffect(() => {
    dispatch(actionCreators.logincheckDB());
  }, []);

  return (
    <UserInfoWrap>
      {user && (
        <FlexGrid padding="30px 0 0 0" gap="0">
          <Radius>
            <LevelImg src={userRank.img} />
          </Radius>
          <MypageUser>
            <Text size="headline2" weight="medium" color="black">
              {user?.nickname}
              <Text size="body2">{" "}님</Text>
            </Text>
            <Text size="subtitle1" color="black" weight="medium">
              {userRank.name}
            </Text>
          </MypageUser>
        </FlexGrid>
      )}
      <MyEggPoint>
        <div style={{ fontSize: "18px", fontWeight: "500" }}>내 알포인트 </div>
        <MyRP>
          {user?.point.toLocaleString("ko-KR")}
          <Text
            color="black"
            size="body2"
            weight="medium"
            margin="10px 0px 0px 5px"
          >
            RP
          </Text>
        </MyRP>
        <div
          onClick={() => {
            history.push("/mypage/eggpoint");
          }}
          style={{ cursor: "pointer", display: "flex" }}
        >
          자세히 보기{" "}
          <img src={arrowright} style={{ margin: "2px 0px 0px 4px" }} />
        </div>
      </MyEggPoint>
    </UserInfoWrap>
  );
};

const UserInfoWrap = styled.div`
  background-color: #fff;
`;

const Radius = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  background-color: #fafafa;
  border-radius: 100%;
  margin: 0px 24px 0px 44px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
`;

const LevelImg = styled.img`
  position: absolute;
  width: 78px;
  height: 100px;
  transform: translate(27px, 15px);
`;

const MypageUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
`;

const MyEggPoint = styled.div`
  color: #686868;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 20px 20px;
  padding: 20px 10px;
  background-color: #faede1;
  border-radius: 10px;
`;

const MyRP = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.orange};
  margin: 0px 25px 2px 0px;
`;

export default UserInfo;
