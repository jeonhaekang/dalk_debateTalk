import React, { useState, useRef } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import Grid from "../elements/Grid";
import ContentContainer from "../elements/Container";

import NewHeader from "../shared/NewHeader";
import PostListCategory from "../components/postlist/PostListCategory";
import Footer from "../shared/Footer";

import SearchBlack from "../image/post/search_black.png";
import Arrow from "../image/post/arrow_upward_black.png";
import FlexGrid from "../elements/FlexGrid";
import categoryDate from "../data/categoryData";
import PostContent from "../components/postlist/PostContent";

const PostList = () => {
  // 클릭하면 스크롤이 위로 올라가는 이벤트 핸들러, Top 버튼
  const boxref = useRef({});
  const handleTop = () => {
    boxref.current[category].scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //-------------검색-------------
  //검색 State
  const [keyword, setKeyword] = useState("");

  //검색 밸류
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  //엔터 키다운 이벤트
  const onKeyDown = (e) => {
    // KeyCode의 13번째는 Enter입니다.
    if (e.keyCode === 13) {
      searchDebate();
    }
  };

  //돋보기 버튼
  const searchDebate = () => {
    history.push(`/postlist/search/${keyword}`);
  };

  const [category, setCategory] = React.useState("전체");
  const [idx, setIdx] = React.useState(0);
  console.log(category);
  return (
    <>
      <NewHeader page="토론 결과방" line />
      <ContentContainer mobile>
        <Container>
          <InputContainer className="searchbox">
            <Input
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={handleKeyword}
              onKeyDown={onKeyDown}
            />
            <SearchImg src={SearchBlack} onClick={searchDebate} alt="돋보기" />
          </InputContainer>
        </Container>

        <PostListCategory
          category={category}
          setCategory={setCategory}
          idx={idx}
          setIdx={setIdx}
        />
        <FlexGrid gap="0">
          {categoryDate.map((el, i) => {
            return (
              <PostContentBox
                idx={idx}
                key={i}
                ref={(ref) => (boxref.current[el.name] = ref)}
              >
                <PostContent category={el.name} />
              </PostContentBox>
            );
          })}
        </FlexGrid>
        <TopBtn onClick={handleTop} src={Arrow}></TopBtn>
      </ContentContainer>
      <Footer />
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #efefef;
  height: 60px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 8px 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  background-color: #fff;
  font-size: ${(props) => props.theme.fontWeight.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  padding: 12px 13px;
  ::placeholder {
    color: #d9d9d9;
    font-size: ${(props) => props.theme.fontWeight.regular};
    font-weight: ${(props) => props.theme.fontWeight.light};
  }
`;

const SearchImg = styled.img`
  position: absolute;
  right: 20px;
  top: 14px;
  width: 34px;
  height: 34px;
  cursor: pointer;
`;

const TopBtn = styled.img`
  position: absolute;
  right: 16px;
  bottom: 16px;
  background-color: rgba(222, 222, 222, 0.8);
  border-radius: 100%;
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const PostContentBox = styled.div`
  --idx: ${(props) => props.idx * -100}%;
  transform: translateX(var(--idx));
  transition: 0.3s;

  width: 100%;
  height: calc((var(--vh) * 100) - 252px);
  // height: 100%;

  background-color: ${(props) => props.color};

  box-sizing: border-box;
  overflow-y: scroll;

  flex: 0 0 auto;
`;

export default PostList;
