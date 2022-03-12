import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import Image from "../../elements/Image";
import { actionCreators } from "../../redux/modules/user";
import Header from "../../shared/Header";
import itemData from "../../data/itemData";
import ContentContainer from "../../elements/Container";

const PointShop = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [item, setItem] = useState(itemData[0]);
  
  const buyItem = () => {
    dispatch(actionCreators.buyItemDB(item));
  };

  return (
    <>
      <Header />
      <ContentContainer Xfooter>
        <FlexGrid is_column gap="30px">
          <MyEggPoint center>보유 알포인트 {user?.point} RP</MyEggPoint>

          {/* 아이템 상세정보 */}
          <FlexGrid padding="0 20px">
            <Image src={item.img} />
            <FlexGrid is_column justifyContent="space-between">
              <FlexGrid is_column>
                <div style={{ fontSize: "24px" }}>{item.name}</div>
                <div>{item.price} RP</div>
                <div style={{ fontSize: "14px" }}>{item.content}</div>
              </FlexGrid>
              <PurchaseBtn onClick={() => buyItem()}>구매</PurchaseBtn>
            </FlexGrid>
          </FlexGrid>

          {/* 아이템 리스트 */}
          {user && (
            <FlexGrid flexWrap="wrap" center gap="20px" padding="20px">
              {itemData.map((el) => {
                return (
                  <FlexGrid
                    is_column
                    center
                    key={el.itemCode}
                    width="calc((100% - 20px) / 2)"
                  >
                    <Image
                      src={el.img}
                      active={item === el ? true : false}
                      _onClick={() => setItem(el)}
                    />
                    <div>
                      {el.name}
                      {user.item[el.itemCode]}
                    </div>
                  </FlexGrid>
                );
              })}
            </FlexGrid>
          )}
        </FlexGrid>
      </ContentContainer>
    </>
  );
};

const MyEggPoint = styled(FlexGrid)`
  font-size: 20px;
  height: 60px;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
`;

const PurchaseBtn = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 30px;
  background-color: #cfcfcf;
  font-size: 16px;
  color: #686868;
  cursor: pointer;
  :hover {
    color: #fff;
  }
`;

export default PointShop;
