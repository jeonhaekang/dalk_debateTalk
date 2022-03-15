import React, { useState, useEffect, memo } from "react";
import PostListCategory from "../components/postlist/PostListCategory";
import PostListCard from "../components/postlist/PostListCard";

import Header from "../shared/Header";
import Grid from "../elements/Grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import ContentContainer from "../elements/Container";
import { useRef } from "react";
import { history } from "../redux/configStore";

const PostList = (props) => {
  const dispatch = useDispatch();

  // 전체 목록 조회
  const debateList = useSelector(state => state.post);

  // 무한 스크롤이 구현될때 page수를 callnext로 받아옵니다.
  // InfinityScroll.js의 handleobserver와 연결
  const getDebateList = () => {
    dispatch(actionCreators.getPostDB(debateList.page))
  }

  // 0번부터 결과창 리스트 불러오기
  // dispatch 될때마다 포스트가 업데이트 됩니다.
  useEffect(() => {
    dispatch(actionCreators.getPostDB(0))
  }, []);

  // 클릭하면 스크롤이 위로 올라가는 이벤트 핸들러
  const boxref = useRef();
  const handleTop = () => {
    boxref.current.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  //-------------검색-------------
  //검색 State
  const [keyword, setKeyword] = useState("");

  //검색 밸류
  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }

  //엔터 키다운 이벤트
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchDebate();
    }
  }

  const searchDebate = () => {
    history.push(`/postlist/search/${keyword}`)
  }

  return (
    <>
      <ContentContainer Xfooter ref={boxref}>

        <Header page="메인" />

        <Grid margin="30px">
          <Container>
            <InputContainer id="SearchBar">
              <Input placeholder="토론 결과를 검색해보세요" value={keyword} onChange={handleKeyword} onKeyDown={onKeyDown} />
              <button onClick={searchDebate}>검색</button>
            </InputContainer>
          </Container>

          <Grid padding="20px 20px 20px">
            <PostListCategory debateList={debateList} />
          </Grid>

          <Grid margin="20px 0px" justifyContent="center">
            {/* props로 리덕스post의 page(callnext)와 리덕스post의 hasnext(paging)를 줍니다 */}
            <InfinityScroll callNext={getDebateList} paging={{ next: debateList.has_next }}>
              {debateList.postList.map((d, idx) => {
                return <PostListCard {...d} key={idx} debateList={debateList.postList} />
              })}
            </InfinityScroll>

            <TopBtn onClick={handleTop}>TOP</TopBtn>
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  )
};

const Container = styled.div`
  position: relative;
  width: 100%;
  // height: fit-content;
`
const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-self: center;
`
const Input = styled.input`
  width: 100%;
  height: 44px;
  background-color: #e5e5e5;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  padding: 13px 16px;
`
const TopBtn = styled.button`
  position: fixed;
  bottom: 0;
`
export default PostList;