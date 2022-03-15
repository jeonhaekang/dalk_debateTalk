import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostListCard from '../components/postlist/PostListCard';
import { actionCreators as searchActions } from '../redux/modules/search';
import Header from '../shared/Header';
import InfinityScroll from '../shared/InfinityScroll';

function SearchPost(props) {
    const keyword = props.match.params.keyword
    const dispatch = useDispatch();
    const searchDebateList = useSelector(state => state.search)

    // 검색결과
    useEffect(() => {
        dispatch(searchActions.getSearchPostDB(keyword, 0))
    }, [])

    const getSearchDebateList = () => {
        dispatch(searchActions.getSearchPostDB(keyword, searchDebateList.page))
    }

    return (
        <>
            <Header />
            <div> {keyword} 검색 결과</div>
            <InfinityScroll callNext={getSearchDebateList} paging={{ next: searchDebateList.has_next }}>
                {searchDebateList.SearchPostList.map((d, idx) => {
                    return <PostListCard {...d} key={idx} debateList={searchDebateList.SearchPostList} />
                })
                }
            </InfinityScroll>
        </>
    )
}

export default SearchPost