import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Header from '../shared/Header';
import Grid from '../elements/Grid';
import PostListCategory from '../components/postlist/PostListCategory';
import PostListCard from '../components/postlist/PostListCard';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import ContentContainer from '../elements/Container';
import { history } from '../redux/configStore';
import { actionCreators as searchActions } from '../redux/modules/search';
import InfinityScroll from '../shared/InfinityScroll';
import Footer from '../shared/Footer';

function SearchCategory(props) {
  const CategoryPage = props.match.params.category;
  const dispatch = useDispatch();
  const searchDebateList = useSelector(state => state.search);

  useEffect(() => {
    dispatch(searchActions.getSearchPostDB(CategoryPage, 0))
    return () => dispatch(searchActions.clear());
  }, [CategoryPage])

  const getSearchDebateList = () => {
    dispatch(searchActions.getSearchPostDB(CategoryPage, searchDebateList.page))
  }

  // 클릭하면 스크롤이 위로 올라가는 이벤트핸들러
  const boxref = useRef();
  const handleTop = () => {
    boxref.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  //검색 State
  const [keyword, setKeyword] = useState("");
  //엔터 키다운 이벤트
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchDebate();
    }
  }
  //검색 밸류
  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }
  //검색결과
  const searchDebate = () => {
    history.push(`/postlist/search/${keyword}`)
  }

  return (
    <>
      <ContentContainer Xfooter ref={boxref}>
        <Header page="토론 결과방" />
        <Grid margin="30px">
          <Container>
            <InputContainer id="SearchBar">
              <Input placeholder="토론 결과를 검색해보세요" value={keyword} onChange={handleKeyword} onKeyDown={onKeyDown} />
            </InputContainer>
          </Container>
          <Grid padding="20px 20px 20px">
            <PostListCategory />
          </Grid>
          <Grid margin="20px 0px" justifyContent="center">
            <InfinityScroll callNext={getSearchDebateList} paging={{ next: searchDebateList.has_next }}>
              {searchDebateList.SearchPostList.map((d, idx) => {
                return <PostListCard {...d} key={idx} />
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
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
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
const Top = styled.div`
   position: fixed;
   bottom: 135px;
   margin: 0 auto;
   max-width: 375px;
   height; 124px;
   z-Index: 2;
`
const TopBtn = styled.button`
  position: absolute;
  top: 0;
  background-color: #F6D629;
  border: none;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  transform: translate(320px, 0px);
  cursor: pointer;
`;

export default SearchCategory