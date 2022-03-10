import React from 'react'
import { history } from '../../redux/configStore'
import apis from '../../shared/apis'
import { deleteCookie } from '../../shared/Cookie'

function UserOut(props) {
    const HandleUserOut = () => {
        apis.userOut()
            .then((res) => {
                console.log("회원탈퇴 완료", res)
                alert("정상적으로 탈퇴되었습니다.")
                deleteCookie("authorization");
                history.replace('/')
            })
            .catch((err) => {
                console.log("회원탈퇴 실패", err)
            })
    }

    const NotUserOut = () => {
        props.setCreateModalState(false)
    }

    return (
        <>
            <div>정말 회원 탈퇴하시겠어요?</div>
            <div>탈퇴를 하시면 작성된 게시물과 댓글은 복구할 수 없습니다</div>
            <button onClick={HandleUserOut}>네</button>
            <button onClick={NotUserOut}>아니오</button>
        </>
    )
}

export default UserOut