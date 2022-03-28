import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Grid from "../elements/Grid";
import ContentContainer from "../elements/Container";

import NewHeader from "../shared/NewHeader";
import PostListCategory from "../components/postlist/PostListCategory";
import PostListCard from "../components/postlist/PostListCard";
import InfinityScroll from "../shared/InfinityScroll";
import Footer from "../shared/Footer";

import SearchBlack from "../image/post/search_black.png";
import Arrow from "../image/post/arrow_upward_black.png";
import FlexGrid from "../elements/FlexGrid";
import categoryDate from "../data/categoryData";
import PostContent from "../components/postlist/PostContent";

const PostList = (props) => {
  const dispatch = useDispatch();
  // // 전체 목록 조회
  // const debateList = useSelector((state) => state.post);

  // // 무한 스크롤이 구현될때 page수를 callnext로 받아옵니다.
  // // InfinityScroll.js의 handleobserver와 연결
  // const getDebateList = () => {
  //   dispatch(postActions.getPostDB(debateList.page));
  // };

  // // 0번부터 결과창 리스트 불러오기
  // // dispatch 될때마다 포스트가 업데이트 됩니다.
  // useEffect(() => {
  //   dispatch(postActions.getPostDB(0));
  //   return () => dispatch(postActions.clear());
  // }, []);

  // 클릭하면 스크롤이 위로 올라가는 이벤트 핸들러, Top 버튼
  const boxref = useRef();
  const handleTop = () => {
    boxref.current.scrollTo({
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
  const api = category === "전체" ? "getDebate" : "getDebateCategory";
  const [idx, setIdx] = React.useState(0);

  return (
    <>
      <NewHeader page="토론 결과방" line />
      <ContentContainer>
        <Grid>
          <Container>
            <InputContainer className="searchbox">
              <Input
                placeholder="검색어를 입력해주세요"
                value={keyword}
                onChange={handleKeyword}
                onKeyDown={onKeyDown}
              />
              <SearchImg
                src={SearchBlack}
                onClick={searchDebate}
                alt="돋보기"
              />
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
                <Test idx={idx} key={i}>
                  <PostContent category={el.name} />
                </Test>
              );
            })}
          </FlexGrid>
        </Grid>
      </ContentContainer>

      <TopBtn onClick={handleTop} src={Arrow}></TopBtn>

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
  bottom: 92px;
  background-color: rgba(222, 222, 222, 0.8);
  border-radius: 100%;
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const Test = styled.div`
  --idx: ${(props) => props.idx * -100}%;
  transform: translateX(var(--idx));
  transition: 0.3s;

  width: 100%;
  height: calc((var(--vh) * 100) - 252px);

  background-color: ${(props) => props.color};

  box-sizing: border-box;
  overflow-y: scroll;

  flex: 0 0 auto;
`;

export default PostList;
