import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import { actionCreators } from "../../redux/modules/user";
import NewHeader from "../../shared/NewHeader";
import itemData from "../../data/itemData";
import ContentContainer from "../../elements/Container";
import Text from "../../elements/Text";
import ItemButton from "../../elements/ItemButton";
import XScrollDrag from "../../components/shared/XScrollDrag";

const PointShop = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [item, setItem] = useState(itemData[0]);

  const buyItem = () => {
    dispatch(actionCreators.buyItemDB(item));
  };

  return (
    <>
      <NewHeader page="알포인트 상점" />
      <ContentContainer padding="26px">
        <FlexGrid is_column gap="20px">
          <FlexGrid
            size="headline2"
            weight="medium"
            lineHeight="28px"
            letter="0.18px"
          >
            <Text>
              {user?.nickname}님이
              <br /> 사용할 수 있는 알포인트는
              <br />
              <Text color="orange">{user?.point.toLocaleString("ko-KR")}</Text>
              RP 에요
            </Text>
          </FlexGrid>

          <ContentBox is_column>
            <FlexGrid gap="16px" alignItems="center" margin="32px 0 0 8px">
              <svg width="24" height="22" viewBox="0 0 24 22">
                <path
                  d="M23.6519 7.00238L22.4036 1.80707C22.1421 0.737093 21.2148 0 20.1329 0H3.61964C2.54967 0 1.61047 0.748981 1.36081 1.80707L0.112508 7.00238C-0.172818 8.21502 0.0887312 9.45143 0.849601 10.4263C0.94471 10.5571 1.07548 10.6522 1.18248 10.7711V19.0217C1.18248 20.3295 2.25245 21.3995 3.5602 21.3995H20.2042C21.512 21.3995 22.5819 20.3295 22.5819 19.0217V10.7711C22.6889 10.6641 22.8197 10.5571 22.9148 10.4382C23.6757 9.46332 23.9491 8.21502 23.6519 7.00238ZM20.0972 2.36583L21.3455 7.56114C21.4644 8.06046 21.3574 8.55978 21.0483 8.95211C20.8819 9.1661 20.5252 9.51087 19.9308 9.51087C19.2056 9.51087 18.5755 8.92833 18.4923 8.15557L17.8027 2.37772L20.0972 2.36583ZM13.0711 2.37772H15.4012L16.0432 7.75136C16.1027 8.21502 15.96 8.67867 15.6509 9.02344C15.3893 9.33254 15.0089 9.51087 14.5215 9.51087C13.7249 9.51087 13.0711 8.80944 13.0711 7.95347V2.37772ZM7.70932 7.75136L8.36319 2.37772H10.6934V7.95347C10.6934 8.80944 10.0395 9.51087 9.15973 9.51087C8.75551 9.51087 8.38697 9.33254 8.10164 9.02344C7.80443 8.67867 7.66176 8.21502 7.70932 7.75136ZM2.4189 7.56114L3.61964 2.37772H5.9617L5.27216 8.15557C5.17705 8.92833 4.55884 9.51087 3.83364 9.51087C3.2511 9.51087 2.88255 9.1661 2.728 8.95211C2.40701 8.57167 2.30001 8.06046 2.4189 7.56114ZM3.5602 19.0217V11.8529C3.65531 11.8648 3.73853 11.8886 3.83364 11.8886C4.86794 11.8886 5.80714 11.4606 6.49668 10.7592C7.21 11.4725 8.16108 11.8886 9.24295 11.8886C10.2773 11.8886 11.2046 11.4606 11.8941 10.783C12.5955 11.4606 13.5466 11.8886 14.6166 11.8886C15.6152 11.8886 16.5663 11.4725 17.2796 10.7592C17.9692 11.4606 18.9084 11.8886 19.9427 11.8886C20.0378 11.8886 20.121 11.8648 20.2161 11.8529V19.0217H3.5602Z"
                  fill="#F19121"
                />
              </svg>
              <Text size="headline1" weight="medium">
                아이템 상점
              </Text>
            </FlexGrid>
            <Text size="subtitle1" weight="medium" marginLeft="15px">
              아이템을 선택해주세요
            </Text>

            {/* 아이템 리스트 부분 */}
            <FlexGrid margin="0 -18px" width="calc(100% + 36px)">
              <XScrollDrag gap="18px" padding="40px 18px 0 18px">
                {itemData.map((el, i) => {
                  return (
                    <ItemButton
                      active={item.itemCode === el.itemCode}
                      onClick={() => {
                        setItem(itemData[i]);
                      }}
                      count={user?.item[el.itemCode]}
                      {...el}
                      key={el.itemCode}
                    />
                  );
                })}
              </XScrollDrag>
            </FlexGrid>
            {/* 땡떙떙떙 부분 */}
            <FlexGrid center>
              {itemData.map((el, i) => {
                return <Dot active={item.itemCode === el.itemCode} key={i} />;
              })}
            </FlexGrid>

            <ItemInfo center>
              <FlexGrid center>{item.name}</FlexGrid>|
              <FlexGrid center gap="3px">
                <Text color="orange">{item.price}</Text>RP
              </FlexGrid>
            </ItemInfo>

            {/* 프리뷰 부분 */}
            <FlexGrid is_column>
              <Text>예시 view</Text>
              <FlexGrid
                height="215px"
                backgroundColor="#F5f5f5"
                borderRadius="15px"
              ></FlexGrid>
            </FlexGrid>
          </ContentBox>
        </FlexGrid>
      </ContentContainer>
      <BuyBtn onClick={buyItem}>알포인트 사용하기</BuyBtn>
    </>
  );
};

const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 3px;
  background-color: #c4c4c4;

  box-shadow: ${(props) => (props.active ? "0 0 0 3px #D2D2D2" : "none")};
  transition: 0.3s;
  margin: 6px 0;
`;

const BuyBtn = styled.button`
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: 0;
  font-size: ${(props) => props.theme.fontSizes.headline2};
  color: white;
  background-color: ${(props) => props.theme.color.orange};
  border: none;
`;

const ContentBox = styled(FlexGrid)`
  box-shadow: 3px 7px 16px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  padding: 18px;
`;

const ItemInfo = styled(FlexGrid)`
  background: rgba(249, 205, 154, 0.5);
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  justify-content: space-evenly;

  width: auto;
  margin: 0 18px;
  padding: 16px;
  border-radius: 10px;
`;

export default PointShop;
