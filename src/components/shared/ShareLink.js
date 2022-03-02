import React, { useState } from 'react'
import styled from 'styled-components'
//링크복사 기능쓰기 위해서 가져오는 라이브러리
import { CopyToClipboard } from 'react-copy-to-clipboard'

//리액트셰어에서 가져오는 공유버튼들
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LineShareButton,
    LineIcon
} from 'react-share'
import Modal from './Modal'

const ShareLink = () => {

    //링크 복사완료되면 복사완료라고 모달 띄워줄거임
    const [showModal, setShowModal] = useState(false);

    //링크 복사 버튼을 클릭하면 디테일 URL 복사됨
    //배포때는 `https://우리URL/detail/${boardId}`
    const debateDetailUrl = `https://www.naver.com`

    //1초 딜레이 모달 닫히게 하기
    const closeModal = () => {
        setTimeout(() => {
            setShowModal(false)
        }, 1000)
    }

    //카피하면 모달창 열고 닫기
    const onCopy = () => {
        setShowModal(true)
        closeModal()
    }

    return (
        <>
        {/* 여기서 부터 보기 */}
                <Container>
                    <ShareBody>
                        {/* <div className="each-share-container">
                            <CopyToClipboard onCopy={onCopy} text={debateDetailUrl}>
                                <button className="link-copy-button">
                                    <LinkCopyIcon />
                                </button>
                            </CopyToClipboard>
                            <p className="each-share-container__text">링크복사</p>
                        </div> */}
                        {/* <div className="each-share-container">
                             <KakaoShareButton />
                            <p className="each-share-container__text">카카오톡</p>
                        </div> */}
                        <div className="each-share-container">
                            <FacebookShareButton url={debateDetailUrl}>
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                            <p className="each-share-container__text">페이스북</p>
                        </div>
                        <div className="each-share-container">
                            <TwitterShareButton url={debateDetailUrl}>
                                <TwitterIcon size={40} round={true} />
                            </TwitterShareButton>
                            <p className="each-share-container__text">트위터</p>
                        </div>
                        <div className="each-share-container">
                            <LineShareButton url={debateDetailUrl}>
                                <LineIcon size={40} round={true} />
                            </LineShareButton>
                            <p className="each-share-container__text">라인</p>
                        </div>
                    </ShareBody>
                    {/* {showModal && <Modal showModal={showModal}>링크 복사 완료!</Modal>} */}
                </Container>
        </>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  width: 80%;
`

const ShareBody = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .each-share-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .each-share-container__text {
      font-size: 12px;
    }
  }
  .link-copy-button {
    width: 52px;
    height: 52px;
    border-radius: 60px;
    margin: 0 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default ShareLink;