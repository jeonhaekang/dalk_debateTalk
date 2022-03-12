import React, { useEffect, useRef } from 'react'
import Spinner from './Spinner'

const InfinityScroll = ({ children, callNext, paging, type }) => {
  const spinnerRef = useRef(null)
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      callNext()
    }
  })

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