import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import shop from "../../image/mypage/shop.svg";
import gacha from "../../image/mypage/gacha.svg";
import flag from "../../image/mypage/outlined_flag.svg";

const ShopGachaAnnounce = (props) => {
  return (
    <Wrap>
      <Content>
        <ContentImage
          onClick={() => {
            history.push("/mypage/pointshop");
          }}
        >
          <ImgSrc src={shop}></ImgSrc>
        </ContentImage>
        <ContentTitle>알포인트 상점</ContentTitle>
      </Content>

      <Content>
        <ContentImage onClick={() => history.push("/mypage/gacha")}>
          <ImgSrc src={gacha}></ImgSrc>
        </ContentImage>
        <ContentTitle>행운뽑기</ContentTitle>
      </Content>

      <Content>
        <ContentImage
          onClick={() => {
            history.push("/announcement");
          }}
        >
          <ImgSrc src={flag}></ImgSrc>
        </ContentImage>
        <ContentTitle>공지사항</ContentTitle>
      </Content>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px 20px 30px 20px;
  background-color: white;
`;

const ImgSrc = styled.img`
  padding-top: 26px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ContentImage = styled.div`
  width: 90px;
  height: 90px;
  background: #faede1;
  border-radius: 75px;
  border: none;
  cursor: pointer;
`;

const ContentTitle = styled.div`
  padding-top: 10px;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #333333;
`;

export default ShopGachaAnnounce;
