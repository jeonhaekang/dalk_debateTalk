import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FlexGrid from '../../elements/FlexGrid'
import { history } from '../../redux/configStore'
import { actionCreators as alertAction } from '../../redux/modules/alert'
import apis from '../../shared/apis'
import { deleteCookie } from '../../shared/Cookie'

function UserOut(props) {
    const dispatch = useDispatch();

    const HandleUserOut = () => {
        apis.userOut()
            .then((res) => {
                console.log("회원탈퇴 완료", res)
                dispatch(alertAction.open({
                    message: "정상적으로 탈퇴되었습니다"
                }))
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
            <OutMessage>
                <div>정말 탈퇴하시겠어요?</div>
                <div>탈퇴를 하시면 작성된 게시물과 댓글은 복구할 수 없습니다</div>
            </OutMessage>
            <FlexGrid center padding="10px">
                <OutBtn onClick={HandleUserOut}>네</OutBtn>
                <OutBtn onClick={NotUserOut}>아니오</OutBtn>
            </FlexGrid>
        </>
    )
}
const OutMessage = styled.div`
    padding: 30px;
`
const OutBtn = styled.button`
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #def;
`

export default UserOut