import React from "react";
import styled from "styled-components";
import Header from "../../shared/Header";

const PointShop = () => {
    return (
        <>
            <Header />
            <MyEggPoint>
                <div>보유 알포인트 2,564</div>
            </MyEggPoint>

            <ItemWrap>
                <ItemImage></ItemImage>
                <PresentItem>
                    <div style={{ fontSize: "24px" }}>나만 말하기</div>
                    <div>500 RP</div>
                    <ItemExplain>
                        <div style={{ fontSize: "14px" }}>나만 말하는 아이템 입니다. 진짜 나만 말해요.</div>
                        <PurchaseBtn>구매</PurchaseBtn>
                    </ItemExplain>
                </PresentItem>
            </ItemWrap>

            <PurchaseWrap>
                <SelectItem>
                    <SelectImage></SelectImage>
                    <SelectText>나만 말하기</SelectText>
                </SelectItem>
                <SelectItem>
                    <SelectImage></SelectImage>
                    <SelectText>나만 말하기</SelectText>
                </SelectItem>
                <SelectItem>
                    <SelectImage></SelectImage>
                    <SelectText>나만 말하기</SelectText>
                </SelectItem>
                <SelectItem>
                    <SelectImage></SelectImage>
                    <SelectText>나만 말하기</SelectText>
                </SelectItem>

            </PurchaseWrap>

        </>
    )
};

const MyEggPoint = styled.div`
    font-size: 20px;
    color: #686868;
    display: flex;
    justify-content: center;
    padding: 18px 20px;
    border-top: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4; 
`

const ItemImage = styled.div`
    width: 164px;
    height: 164px;
    background-color: #CFCFCF;
    border: none;
    border-radius: 30px;
`

const ItemWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px 10px;
    color: #686868;
`

const PresentItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    margin: 10px 0px 0px 20px;
`

const PurchaseBtn = styled.button`
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 30px;
    background-color: #CFCFCF;
    font-size: 16px;
    color: #686868;
`

const ItemExplain = styled.div`
    padding-top: 24px;
`

const PurchaseWrap = styled.div`
    border-top: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const SelectImage = styled.div`
    width: 164px;
    height: 164px;
    background-color: #CFCFCF;
    border: none;
    border-radius: 30px;
`

const SelectItem = styled.div`
    width: 164px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 5px;
`

const SelectText = styled.div`
    padding-top: 12px;
`

export default PointShop;