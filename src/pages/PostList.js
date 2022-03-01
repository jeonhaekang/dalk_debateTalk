import React from "react";
import SearchCard from "../components/postlist/SearchCard";
import PostListCategory from "../components/postlist/PostListCategory";
import PostListCard from "../components/postlist/PostListCard";

import Header from "../shared/Header";

import Grid from "../elements/Grid";

const PostList = (props) => {
  return (
    <>
    <Header page="메인" />
    <Grid margin="30px">
      <SearchCard />
      <Grid padding="20px 20px 20px">
      <PostListCategory />

      </Grid>
      <Grid margin="20px 0px" justifyContent="center">
      <PostListCard />
      </Grid>
    </Grid>
    </>
  )
};

PostList.defaultProps = {};

export default PostList;
