import React, { useState } from "react";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import { history } from "../../redux/configStore";
import XScrollDrag from "../shared/XScrollDrag";
import categoryDate from "../../data/categoryData";
import { includes } from "lodash";

const PostListCategory = () => {
  const CategoryList = [
    "연애",
    "정치",
    "게임",
    "음식",
    "유머",
    "헬프",
    "망상",
    "운동",
    "기타",
  ];
  // console.log(window.location.href)

  return (
    <>
      <CategoryScroll is_column>
        <XScrollDrag>
          <CategoryBtn center _onClick={() => history.replace('/postlist')}>전체</CategoryBtn>
          {/* <CategoryBtn center category={window.location.href.indexOf("연애") ? "연애" : null} _onClick={() => history.replace('/postlist/' + "연애")}>연애</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"정치"} _onClick={() => history.replace('/postlist/' + "정치")}>정치</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"게임"} _onClick={() => history.replace('/postlist/' + "게임")}>게임</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"음식"} _onClick={() => history.replace('/postlist/' + "음식")}>음식</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"유머"} _onClick={() => history.replace('/postlist/' + "유머")}>유머</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"헬프"} _onClick={() => history.replace('/postlist/' + "헬프")}>헬프</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"망상"} _onClick={() => history.replace('/postlist/' + "망상")}>망상</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"운동"} _onClick={() => history.replace('/postlist/' + "운동")}>운동</CategoryBtn>
          <CategoryBtn center category={window.location.href.indexOf("연애") ? null :"기타"} _onClick={() => history.replace('/postlist/' + "기타")}>기타</CategoryBtn> */}
          {CategoryList.map((c, idx) => {
            return <CategoryBtn center key={idx} _onClick={() => history.replace("/postlist/" + c)}>
              {c}
            </CategoryBtn>
          })}
        </XScrollDrag>
      </CategoryScroll>
    </>
  )
};

const CategoryScroll = styled.div`
gap: 0;
border-bottom: 2px solid #e5e5e5;

background-color: white;
z-index: 100;
`
const CategoryBtn = styled(FlexGrid)`
width: calc(100% / 6);
height: 46px;
flex: 0 0 auto;

font-size: ${(props) => props.theme.fontSizes.subtitle1};
font-weight: ${(props) => props.theme.fontWeight.medium};
color: ${(props) => (props.category ? props.theme.color.orange : "#ABABAB")};
${(props) =>
    props.category &&
    `color: ${props.theme.color.orange}; border-bottom: 2px solid orange;`}

transition: 0.05s;
`

export default PostListCategory;