import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as searchActions } from '../redux/modules/search';

import NewHeader from '../shared/NewHeader';
import PostListCard from '../components/postlist/PostListCard';
import InfinityScroll from '../shared/InfinityScroll';

import Grid from '../elements/Grid';

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
            <NewHeader page="검색 결과" />
            <Grid>
                <SearchResult> <span className='Mykeyword'>"{keyword}"</span> 검색 결과</SearchResult>
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
    padding: 20px;
    font-size: ${(props) => props.theme.fontSizes.subtitle1};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    .Mykeyword{
        color: ${(props) => props.theme.color.orange};
    }
`

export default SearchPost