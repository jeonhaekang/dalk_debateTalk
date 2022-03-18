import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import Grid from "../elements/Grid";
import PostListCategory from "../components/postlist/PostListCategory";
import PostListCard from "../components/postlist/PostListCard";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import ContentContainer from "../elements/Container";
import { history } from "../redux/configStore";
import { actionCreators as searchActions } from "../redux/modules/search";
import InfinityScroll from "../shared/InfinityScroll";
import Footer from "../shared/Footer";
import SearchBlack from "../image/post/search_black.png";
import Arrow from "../image/post/arrow_upward_black.png";

function SearchCategory(props) {
  const CategoryPage = props.match.params.category;
  const dispatch = useDispatch();
  const searchDebateList = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(searchActions.getSearchPostDB(CategoryPage, 0));
    return () => dispatch(searchActions.clear());
  }, [CategoryPage]);

  const getSearchDebateList = () => {
    dispatch(
      searchActions.getSearchPostDB(CategoryPage, searchDebateList.page)
    );
  };

  // 클릭하면 스크롤이 위로 올라가는 이벤트핸들러
  const boxref = useRef();
  const handleTop = () => {
    boxref.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //검색 State
  const [keyword, setKeyword] = useState("");
  //엔터 키다운 이벤트
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchDebate();
    }
  };
  //검색 밸류
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };
  //검색결과
  const searchDebate = () => {
    history.push(`/postlist/search/${keyword}`);
  };

  return (
    <>
      <ContentContainer Xfooter ref={boxref}>
        <Header page="토론 결과방" />

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

          <PostListCategory category={CategoryPage} />

          <Grid justifyContent="center">
            <InfinityScroll
              callNext={getSearchDebateList}
              paging={{ next: searchDebateList.has_next }}
            >
              {searchDebateList.SearchPostList.map((d, idx) => {
                return <PostListCard {...d} key={idx} />;
              })}
            </InfinityScroll>

            <TopBtn onClick={handleTop} src={Arrow}></TopBtn>
          </Grid>
        </Grid>
      </ContentContainer>
      <Footer />
    </>
  );
}

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
  font-weight: 500;
  font-size: 14px;
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
  bottom: 92px;
  right: 16px;
  background-color: rgba(222, 222, 222, 0.8);

  border-radius: 100%;
  width: 60px;
  height: 60px;

  cursor: pointer;
`;

export default SearchCategory;
