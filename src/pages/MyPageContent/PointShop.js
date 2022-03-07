import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../shared/Header";

const PointShop = () => {
    const user = useSelector(state => state.user.user);

    const [itemName, setItemName] = useState("");
    const [itemRP, setItemRP] = useState();
    const [itemContent, setItemContent] = useState("");

    const onlyme = {
        name : "나만 말하기",
        rp: 1000,
        content: "나만 말하는 아이템 입니다. 진짜 나만 말해요."
    }

    const bigfont = {
        name: "빅폰트",
        rp: 500,
        content: "다른 의견은 작아보이게 내 채팅이 커져요."
    }

    const myname = {
        name: "전부 내이름",
        rp: 500,
        content: "누가 누군지? 모두 내 이름으로 바뀌어요."
    }

    const buyexp = {
        name: "경험치 구매",
        rp: 500,
        content: "경험치를 구매해서 배지모양 바꿔봐요."
    }

    const handleOnlyMe = () => {
        setItemName(onlyme.name)
        setItemRP(onlyme.rp)
        setItemContent(onlyme.content)
    };
    
    const handleBigFont = () => {
        setItemName(bigfont.name)
        setItemRP(bigfont.rp)
        setItemContent(bigfont.content)
    }

    const handleMyName = () => {
        setItemName(myname.name)
        setItemRP(myname.rp)
        setItemContent(myname.content)
    }

    const handleBuyExp = () => {
        setItemName(buyexp.name)
        setItemRP(buyexp.rp)
        setItemContent(buyexp.content)
    }

    return (

        <>
            <Header />
            <MyEggPoint>
                <div>보유 알포인트 {user?.point} RP</div>
            </MyEggPoint>

            <ItemWrap>
                <ItemImage></ItemImage>
                <PresentItem>
                    <div style={{ fontSize: "24px" }}>{itemName}</div>
                    <div>{itemRP} RP</div>
                    <ItemExplain>
                        <div style={{ fontSize: "14px" }}>{itemContent}</div>
                        <PurchaseBtn>구매</PurchaseBtn>
                    </ItemExplain>
                </PresentItem>
            </ItemWrap>

            <PurchaseWrap>
                <SelectItem>
                    <SelectImage className="onlyme" onClick={handleOnlyMe}></SelectImage>
                    <SelectText>나만 말하기</SelectText>
                </SelectItem>
                <SelectItem>
                    <SelectImage className="bigfont" onClick={handleBigFont}></SelectImage>
                    <SelectText>빅폰트</SelectText>
                </SelectItem>
                <SelectItem>
                    <SelectImage className="myname" onClick={handleMyName}></SelectImage>
                    <SelectText>모두 다 내이름</SelectText>
                </SelectItem>
                <SelectItem>
                    <SelectImage className="buyexp" onClick={handleBuyExp}></SelectImage>
                    <SelectText>경험치 구매</SelectText>
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
    cursor: pointer;
    :hover {
        color: #fff;
    }
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
    cursor: pointer;
    box-shadow: 2px 4px 0 rgb(0,0,0,0.5);
    :hover {
        background-color: #C4C4C4;
    }
    :active {
        box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
        position: relative;
        top: 2px;
    }
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