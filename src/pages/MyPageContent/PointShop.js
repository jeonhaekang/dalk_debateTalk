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
      <ContentContainer padding="24px">
        <FlexGrid is_column gap="50px">
          <FlexGrid
            size="headline2"
            weight="medium"
            lineHeight="28px"
            letter="0.18px"
            is_column
            gap="28px"
          >
            <Text>
              {user?.nickname}님이
              <br /> 사용할 수 있는 알포인트는
              <br />
              <Text color="orange">{user?.point.toLocaleString("ko-KR")}</Text>
              RP 에요
            </Text>

            <Text>아이템을 선택해주세요</Text>
          </FlexGrid>

          <FlexGrid is_column gap="18px">
            {/* 아이템 리스트 부분 */}
            <FlexGrid
              margin="0 -24px"
              width="calc(100% + 48px)"
              is_column
              gap="55px"
            >
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
              {/* 땡떙떙떙 부분 */}
              <FlexGrid center>
                {itemData.map((el, i) => {
                  return <Dot active={item.itemCode === el.itemCode} key={i} />;
                })}
              </FlexGrid>
            </FlexGrid>

            <FlexGrid is_column padding="0 24px">
              <ItemInfo>
                <FlexGrid center>{item.name}</FlexGrid>
                <Text color="white">|</Text>
                <FlexGrid center gap="3px">
                  <Text weight="medium" color="orange">
                    {item.price}
                  </Text>
                  RP
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
            </FlexGrid>
          </FlexGrid>
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
  height: 76px;
  position: absolute;
  bottom: 0;
  font-size: ${(props) => props.theme.fontSizes.headline2};
  color: white;
  background-color: ${(props) => props.theme.color.orange};
  border: none;
`;

const ItemInfo = styled(FlexGrid)`
  background: #faede1;
  font-size: ${(props) => props.theme.fontSizes.body2};
  justify-content: space-evenly;

  width: auto;
  height: 62px;
  border-radius: 10px;
`;

export default PointShop;
