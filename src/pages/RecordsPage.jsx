import { useMemo, useState } from 'react'
import { useLibrary } from '../hooks/LibraryContext.jsx'
import RecordCard from '../components/RecordCard.jsx'

export default function RecordsPage() {
  const { books, records, removeRecord } = useLibrary()
  const [query, setQuery] = useState('')
  const [seed, setSeed] = useState(0)

  const titleOf = (bookId) => books.find((b) => b.id === bookId)?.title ?? '지운 책'

  // 지난 기록 다시 만나기: 기록 중 하나를 골라 맨 위에 보여 준다
  const revisit = useMemo(() => {
    if (records.length === 0) return null
    return records[Math.floor(Math.random() * records.length)]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records.length, seed])

  const filtered = records.filter((r) =>
    `${r.quote} ${r.note} ${titleOf(r.bookId)}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div className="stack">
      <h1 className="page-title">기록</h1>

      {revisit && (
        <section className="revisit">
          <p className="eyebrow">지난 기록 다시 만나기</p>
          <RecordCard record={revisit} bookTitle={titleOf(revisit.bookId)} />
          <button className="link small" onClick={() => setSeed((s) => s + 1)}>다른 기록 보기</button>
        </section>
      )}

      <input className="input" placeholder="문장, 생각, 책 제목으로 찾기" value={query}
        onChange={(e) => setQuery(e.target.value)} />

      {filtered.length === 0 && <p className="muted">기록이 없어요.</p>}
      {filtered.map((r) => (
        <RecordCard key={r.id} record={r} bookTitle={titleOf(r.bookId)} onDelete={removeRecord} />
      ))}
    </div>
  )
}
