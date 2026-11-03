import { useEffect, useState } from 'react'

// localStorage에 값을 저장하고 새로고침해도 유지되게 하는 훅
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // 저장 공간을 쓸 수 없는 환경(시크릿 창 등)에서는 메모리에만 둔다
    }
  }, [key, value])

  return [value, setValue]
}
