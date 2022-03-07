import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import apis from "../shared/apis";
import SearchCard from "../components/postlist/SearchCard";
import PostListCategory from "../components/postlist/PostListCategory";
import PostListCard from "../components/postlist/PostListCard";


import Header from "../shared/Header";

import Grid from "../elements/Grid";

const PostList = () => {
  const [debateList, setDebateList] = useState([]);
  console.log(debateList)

  useEffect (() => {
    getDebate()
  },[]);

  const getDebate = async () => {
    await apis.getDebate()
               .then((res) => {
                console.log(res)
                setDebateList(res.data)
              })
              .catch((err) => {
                console.log("토론 결과 리스트 에러", err)
              })
            }

  return (
    <>
      <Header page="메인" />
      <Grid margin="30px">
        <SearchCard />
        <Grid padding="20px 20px 20px">
          <PostListCategory />
        </Grid>
        <Grid margin="20px 0px" justifyContent="center">
          {debateList.map((d,idx) => {
            return <PostListCard {...d} key={idx} debateList={debateList}/>
          })
          }
          {/* <PostListCard /> */}
        </Grid>
      </Grid>
    </>
  )
};

PostList.defaultProps = {};

export default PostList;
