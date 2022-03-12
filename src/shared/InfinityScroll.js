import React, { useEffect, useRef } from 'react'
import Spinner from './Spinner'

const InfinityScroll = ({ children, callNext, paging, type }) => {
  //스피너 Ref
  const spinnerRef = useRef(null)
  //스크롤바닥에 닫으면 감지해주는 옵저버
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      callNext()
    }
  })

  //next가 없으면 끝, 스피너도 끝
  //페이징 할 때마다 옵저빙 실행
  //스피너, 옵저버 끝단 확인시 옵저빙도 종료
  useEffect(() => {
    if (paging.next === false) return
    if (!spinnerRef.current) return

    handleObserver.observe(spinnerRef.current)

    return () => {
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current)
    }
  }, [paging])

  return (
    <>
      {children}
      {paging.next && (
        <Spinner ref={spinnerRef} />
      )}
    </>
  )
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
}

export default InfinityScroll