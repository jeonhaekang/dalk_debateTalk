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
            <Grid display="flex" justifyContent="center" margin="30px">
                승리!!!!
            </Grid>
        </>
    )
};

export default DetailCard;