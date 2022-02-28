import React from "react";
import Button from "../../elements/Button";
import Grid from "../../elements/Grid";

const CommentWrite = (props) => {
    return (
        <>
            <Grid display="flex">
                <div>댓글 작성칸</div>
                <Button>작성</Button>
            </Grid>
        </>
    )
};

export default CommentWrite;