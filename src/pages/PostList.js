import React from "react";
import SearchCard from "../components/postlist/SearchCard";
import PostListCategory from "../components/postlist/PostListCategory";
import PostListCard from "../components/postlist/PostListCard";

const PostList = (props) => {
  return (
    <>
      <SearchCard />
      <PostListCategory />
      <PostListCard />
    </>
  )
};

PostList.defaultProps = {};

export default PostList;
