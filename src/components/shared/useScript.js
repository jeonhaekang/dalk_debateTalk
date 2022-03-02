// 카카오톡 공유하기 기능때문에 스크립트 사용
// url을 여러군데서 사용해야하니 렌더링 될때마다 useEffect 사용
import { useEffect } from 'react'

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
}

export default useScript