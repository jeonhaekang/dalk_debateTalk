import React, { useState, useEffect, useRef } from "react";
import PostListCategory from "../components/postlist/PostListCategory";
import PostListCard from "../components/postlist/PostListCard";
import InfinityScroll from "../shared/InfinityScroll";

import Header from "../shared/Header";
import Grid from "../elements/Grid";
import styled from "styled-components";
import ContentContainer from "../elements/Container";

import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Footer from "../shared/Footer";

const PostList = (props) => {
  const dispatch = useDispatch();

  // 전체 목록 조회
  const debateList = useSelector((state) => state.post);

  // 무한 스크롤이 구현될때 page수를 callnext로 받아옵니다.
  // InfinityScroll.js의 handleobserver와 연결
  const getDebateList = () => {
    dispatch(postActions.getPostDB(debateList.page));
  };

  // 0번부터 결과창 리스트 불러오기
  // dispatch 될때마다 포스트가 업데이트 됩니다.
  useEffect(() => {
    dispatch(postActions.getPostDB(0));

    return () => dispatch(postActions.clear());
  }, []);

  // 클릭하면 스크롤이 위로 올라가는 이벤트 핸들러
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
    if (e.keyCode === 13) {
      searchDebate();
    }
  };

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
            </InputContainer>
          </Container>

          <Grid padding="20px 20px 20px">
            <PostListCategory debateList={debateList} />
          </Grid>

          <Grid margin="20px 0px" justifyContent="center">
            {/* props로 리덕스post의 page(callnext)와 리덕스post의 hasnext(paging)를 줍니다 */}
            <InfinityScroll
              callNext={getDebateList}
              paging={{ next: debateList.has_next }}
            >
              {debateList.postList.map((d, idx) => {
                return <PostListCard {...d} key={idx} />;
              })}
            </InfinityScroll>
            <Top>
              <TopBtn onClick={handleTop}>TOP</TopBtn>
            </Top>
          </Grid>
        </Grid>
      </ContentContainer>
      <Footer />
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: black;
`;
const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-self: center;
`;
const Input = styled.input`
  width: 100%;
  height: 44px;
  background-color: #fff;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  padding: 13px 16px;
`;
const Top = styled.div`
   position: fixed;
   bottom: 135px;
   margin: 0 auto;
   max-width: 375px;
   height: 124px;
   z-Index: 2;
`;
const TopBtn = styled.button`
  position: absolute;
  top: 0;
  background-color: #f6d629;
  border: none;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  transform: translate(360px, 0px);
  cursor: pointer;
`;
export default PostList;
