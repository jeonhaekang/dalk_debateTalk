import React from "react";
import Button from "../../elements/Button";
import Grid from "../../elements/Grid";

const PostListCategory = (props) => {
  return (
  <Grid>
    <Button>#음식</Button>
    <Button>#생활</Button>
    <Button>#연애</Button>
    <Button>#정치</Button>
    <Button>#게임</Button>
  </Grid>
  )
};

export default PostListCategory;