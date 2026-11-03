import { useEffect, useState } from 'react'
import { searchBooks } from '../api/bookSearch.js'
import { searchCatalog } from '../data/catalog.js'

// 입력이 멈추고 0.4초 뒤에 검색하고, 새 입력이 오면 이전 요청은 취소한다
export default function useBookSearch(keyword) {
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | done | offline

  useEffect(() => {
    const q = keyword.trim()
    if (q.length < 2) {
      setResults([])
      setStatus('idle')
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setStatus('loading')
      try {
        const books = await searchBooks(q, { signal: controller.signal })
        setResults(books)
        setStatus('done')
      } catch (err) {
        if (err.name === 'AbortError') return
        // 인터넷이 안 되면 내장된 예시 목록에서라도 찾아 준다
        setResults(searchCatalog(q).map((b) => ({ ...b, id: b.title, coverUrl: null })))
        setStatus('offline')
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [keyword])

  return { results, status }
}
