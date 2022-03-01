import React from "react";
import Grid from "../../elements/Grid";

const UserInfo = (props) => {
    return (
        <>
            <Grid display="flex">
                <div>배지</div>
                <div>닉네임</div>
                <div>LV 1</div>
            </Grid>
            <div> 보유 알포인트 0 ©</div>
        </>
    )
};

export default UserInfo;