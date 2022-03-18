import React, { useState } from "react";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import { history } from "../../redux/configStore";
import XScrollDrag from "../shared/XScrollDrag";
import categoryDate from "../../data/categoryData";
import { includes } from "lodash";

const PostListCategory = ({ category }) => {
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

  const path = window.location.pathname;

  return (
    <>
      <CategoryScroll is_column>
        <XScrollDrag>
          <CategoryBtn
            category={path === "/postlist"}
            center
            _onClick={() => history.replace("/postlist")}
          >
            전체
          </CategoryBtn>

          {CategoryList.map((c, idx) => {
            return (
              <CategoryBtn
                category={c === category}
                center
                key={idx}
                _onClick={() => history.replace("/postlist/" + c)}
              >
                {c}
              </CategoryBtn>
            );
          })}
        </XScrollDrag>
      </CategoryScroll>
    </>
  );
};

const CategoryScroll = styled.div`
  gap: 0;
  border-bottom: 2px solid #e5e5e5;

  background-color: white;
  z-index: 100;
`;
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
`;

export default PostListCategory;
