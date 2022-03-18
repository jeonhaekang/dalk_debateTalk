import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "../../redux/modules/alert";

import Grid from "../../elements/Grid";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../shared/Modal";
import ShareLink from "../shared/ShareLink";

const DetailHeader = (props) => {
    const { page, boardId, debate } = props;
    const dispatch = useDispatch();
    const [threeDotButton, setThreeDotButton] = useState(false);

    //신고 기능
    const [isWarn, setIsWarn] = useState(false);

    const token = document.cookie;
    const tokenCheck = token.split("=")[1];
    const handleClickWarning = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!tokenCheck) {
            dispatch(alertAction.open({
                message: "로그인이 필요한 서비스입니다"
            }))
            history.replace("/login");
        }
        if (isWarn === false) {
            await apis
                .warningDebate(boardId)
                .then((res) => {
                    if (window.confirm("정말 신고하시겠어요?")) {
                        console.log("상세페이지 신고 성공", res);
                        setIsWarn(true);
                        dispatch(alertAction.open({
                            message: "신고처리가 완료되었습니다",
                        })
                        );
                        setThreeDotButton(false);
                    } else {
                        return;
                    }
                })
                .catch((err) => {
                    console.log("이미 신고한 유저입니다", err);
                    dispatch(alertAction.open({
                        message: "이미 신고를 하셨습니다"
                    }))
                    return;
                });
        } else {
            dispatch(alertAction.open({
                message: "이미 신고를 하셨습니다"
            }))
            return;
        }
    };

    //모달
    const [createModalState, setCreateModalState] = useState(false);

    const shareModal = () => {
        setCreateModalState(true);
    }

    return (
        <HeaderContainer>
            <Grid position="relative" width="100%">
                {/* 페이지에 따른 뒤로가기 버튼 및 신고버튼 */}
                <Grid
                    display="flex"
                    justifyContent="space-between"
                    fontSize="30px"
                    alignItems="center"
                    height="100%"
                >
                    {page !== "메인" && (
                        <div onClick={() => history.goBack()}>
                            <IoChevronBackOutline />
                        </div>
                    )}
                    {threeDotButton ? (
                        <div>
                            <BsThreeDotsVertical onClick={() => setThreeDotButton(false)} />
                            <SideBarModal>
                                <SideGoProfile onClick={handleClickWarning}>
                                    <SideBarText>게시물 신고하기</SideBarText>
                                </SideGoProfile>
                                <SideGoProfile onClick={shareModal}>
                                    <SideBarText>게시물 공유하기</SideBarText>
                                </SideGoProfile>
                            </SideBarModal>
                                <Modal modalState={createModalState} setModalState={setCreateModalState}>
                                    {/* 공유하기 기능 */}
                                    <ShareLink createModalState={createModalState} setCreateModalState={setCreateModalState} />
                                </Modal>
                        </div>
                    ) : (
                        <div>
                            <BsThreeDotsVertical onClick={() => setThreeDotButton(true)} />
                        </div>
                    )}
                </Grid>

                {/* 페이지가 메인이면 로고 이미지 출력 아니면 텍스트 출력 */}
                <Logo>{page === "메인" ? "DALKING" : page}</Logo>
            </Grid>
        </HeaderContainer>
    );
};

DetailHeader.defaultProps = {};

const HeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 70px;
  display: flex;
  z-index: 990;
  background-color: white;
`;
const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  color: #f19121;
  font-weight: 900;
`;
const SideBarModal = styled.div`
  position: absolute;
  background-color: #fff;
  top: 48px;
  right: 10px;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  z-index: 9;
`
const SideGoProfile = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  height: 35px;
  padding: 14px;
  &:hover {
    background-color: #f7f7f7;
  }
`
const SideBarText = styled.div`
  margin-left: 10px;
  color : black;
  font-size : 20px;
`
export default DetailHeader;
