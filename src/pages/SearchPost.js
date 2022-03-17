import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PostListCard from '../components/postlist/PostListCard';
import Grid from '../elements/Grid';
import { actionCreators as searchActions } from '../redux/modules/search';
import Header from '../shared/Header';
import InfinityScroll from '../shared/InfinityScroll';

function SearchPost(props) {
    const keyword = props.match.params.keyword
    const dispatch = useDispatch();
    const searchDebateList = useSelector(state => state.search)

    // 검색결과
    useEffect(() => {
        dispatch(searchActions.getSearchPostDB(keyword, 0));
        return () => dispatch(searchActions.clear());
    }, []);

    const getSearchDebateList = () => {
        dispatch(searchActions.getSearchPostDB(keyword, searchDebateList.page))
    }

    return (
        <>
            <Header page="검색 결과" />
            <Grid margin="30px">
                <SearchResult> "{keyword}" 검색 결과</SearchResult>
                <InfinityScroll callNext={getSearchDebateList} paging={{ next: searchDebateList.has_next }}>
                    {searchDebateList.SearchPostList.map((d, idx) => {
                        return <PostListCard {...d} key={idx} />
                    })
                    }
                </InfinityScroll>
            </Grid>
        </>
    )
}

const SearchResult = styled.div`
    font-size: ${(props) => props.theme.fontSizes.subtitle1};
    font-weight: ${(props) => props.theme.fontWeight.medium};
`

export default SearchPost