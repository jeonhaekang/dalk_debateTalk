import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostListCard from '../components/postlist/PostListCard';
import { actionCreators as searchActions} from '../redux/modules/search';
import Header from '../shared/Header';

function SearchPost(props) {
    const keyword = props.match.params.keyword
    const dispatch = useDispatch();
    const searchDebateList = useSelector(state => state.search)
    // 검색결과
    useEffect(() => {
        dispatch(searchActions.getSearchPostDB(keyword, searchDebateList.page))
    }, [])
    return (
        <>
        <Header />
        <div> {keyword} 검색 결과</div>
            {searchDebateList.SearchPostList.map((d, idx) => {
                return <PostListCard {...d} key={idx} debateList={searchDebateList.SearchPostList} />
            })
            }
        </>
    )
}

export default SearchPost