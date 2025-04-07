import { useEffect } from 'react'

/**
 * 페이지를 벗어날 때(새로고침, 닫기 등) 경고창을 띄우는 훅
 * @param shouldWarn 사용자가 벗어나려 할 때 경고를 띄울지 여부
 */
export function useUnloadWarning(shouldWarn: boolean): void {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldWarn) return
      e.preventDefault()
      // @ts-ignore: returnValue는 브라우저에서 필수지만 타입스크립트는 사용 안 한다고 경고함
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [shouldWarn])
}
