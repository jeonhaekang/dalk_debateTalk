import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as searchActions } from "../redux/modules/search";

import NewHeader from "../shared/NewHeader";
import PostListCard from "../components/postlist/PostListCard";
import InfinityScroll from "../shared/InfinityScroll";

import Text from "../elements/Text";
import FlexGrid from "../elements/FlexGrid";

function SearchPost(props) {
  const keyword = props.match.params.keyword;
  const dispatch = useDispatch();
  const searchDebateList = useSelector((state) => state.search);

  // 검색결과
  useEffect(() => {
    dispatch(searchActions.getSearchPostDB(keyword, 0));
    return () => dispatch(searchActions.clear());
  }, []);

  const getSearchDebateList = () => {
    dispatch(searchActions.getSearchPostDB(keyword, searchDebateList.page));
  };

  return (
    <>
      <NewHeader page="검색 결과" />
      <FlexGrid padding="20px" gap="0px">
        <Text size="subtitle1" weight="medium">
          <Text color="orange">"{keyword}"</Text> {" "}
          검색 결과
        </Text>
      </FlexGrid>
      <InfinityScroll
        callNext={getSearchDebateList}
        paging={{ next: searchDebateList.has_next }}
      >
        {searchDebateList.SearchPostList.map((d, idx) => {
          return <PostListCard {...d} key={idx} />;
        })}
      </InfinityScroll>
    </>
  );
}

export default SearchPost;
