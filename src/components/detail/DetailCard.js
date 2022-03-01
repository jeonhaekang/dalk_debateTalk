import React from "react";
import Grid from "../../elements/Grid";

const DetailCard = (props) => {
    return (
        <>
        <Grid display="flex" justifyContent="center" margin="30px">
            <Grid display="flex" justifyContent="center" margin="30px">주제1</Grid>
            <Grid display="flex" justifyContent="center" margin="30px">
                주제2
            </Grid>
        </Grid>
            {/* 부모 승리 state 설정 : bollean 값에 따라 주제1 또는 주제 2 승리 위치변경  */}
            <Grid display="flex" justifyContent="center" margin="30px">
                승리!!!!
            </Grid>
        </>
    )
};

export default DetailCard;