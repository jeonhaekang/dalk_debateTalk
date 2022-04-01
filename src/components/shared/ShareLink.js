// 토론결과 detail 페이지에 있는 공유하기 버튼 컴포넌트들
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { actionCreators as alertAction } from '../../redux/modules/alert'
import { KakaoShareButton } from './KaKaoShareButton'

import link from '../../image/shared/link.png'

//카카오 공유하기 Developer Script 사용
import useScript from './useScript'

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

const ShareLink = () => {
  const dispatch = useDispatch();
  useScript('https://developers.kakao.com/sdk/js/kakao.js')

  //링크 복사완료되면 복사완료라고 모달 띄워줄거임
  const [showModal, setShowModal] = useState(false);

  //링크 복사 버튼을 클릭하면 현재 URL 복사됨
  //배포때는 `https://배포URL/detail/${boardId}`
  const debateDetailUrl = window.location.href

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
      <Container>
          <Title>게시물 공유하고 <br/> 결과에 대해 토론해보세요!</Title>
        <ShareBody>
          <div className="each-share-container">
            <CopyToClipboard onCopy={onCopy} text={debateDetailUrl}>
              <button className="link-copy-button" 
              onClick={() => {
                dispatch(alertAction.open({
                  message: "복사 완료!"
                }))
                }}>
                <img src={link} width="40" />
              </button>
            </CopyToClipboard>
            <p className="each-share-container__text">링크복사</p>
          </div>
          <div className="each-share-container">
            <KakaoShareButton />
            <p className="each-share-container__text">카카오톡</p>
          </div>
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
  padding: 30px 15px;
  width: 100%;
`
const Title = styled.div`
  padding-bottom: 30px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`
const ShareBody = styled.div`
  width: 100%;
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
      width : 50px;
      text-align : center;
    }
  }
  .link-copy-button {
    width: 40px;
    height: 40px;
    border-radius: 60px;
    margin: 0 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
  }
`

export default ShareLink;