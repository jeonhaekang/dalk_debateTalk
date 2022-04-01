import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

import FlexGrid from "../../elements/FlexGrid";

import { ReactComponent as Shop} from "../../image/mypage/shop.svg";
import { ReactComponent as Gacha} from "../../image/mypage/gacha.svg";
import { ReactComponent as Flag} from "../../image/mypage/outlined_flag.svg";

const ShopGachaAnnounce = () => {
  return (
    <Wrap>
      <FlexGrid center is_column gap="0">
        <ContentImage center
          _onClick={() => {
            history.push("/mypage/pointshop");
          }}
        >
          <Shop style={{width: "30px"}} />
        </ContentImage>
        <ContentTitle>알포인트 상점</ContentTitle>
      </FlexGrid>

      <FlexGrid center is_column gap="0">
        <ContentImage center
        _onClick={() => history.push("/mypage/gacha")}>
          <Gacha style={{width: "30px"}} />
        </ContentImage>
        <ContentTitle>행운뽑기</ContentTitle>
      </FlexGrid>

      <FlexGrid center is_column gap="0">
        <ContentImage center
          _onClick={() => {
            history.push("/announcement");
          }}
        >
          <Flag style={{width: "30px"}} />
        </ContentImage>
        <ContentTitle>공지사항</ContentTitle>
      </FlexGrid>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 24px;
  background-color: #fff;
`;

const ContentImage = styled(FlexGrid)`
  width: 84px;
  height: 84px;
  background-color: #faede1;
  text-align: center;
  border-radius: 75px;
  border: none;
  cursor: pointer;
`;

const ContentTitle = styled.div`
  padding-top: 18px;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #333333;
`;

export default ShopGachaAnnounce;
