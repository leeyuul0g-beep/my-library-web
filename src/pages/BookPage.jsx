import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLibrary } from '../hooks/LibraryContext.jsx'
import ProgressInput from '../components/ProgressInput.jsx'
import RecordCard from '../components/RecordCard.jsx'

export default function BookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { books, records, addRecord, removeRecord, removeBook } = useLibrary()
  const [form, setForm] = useState({ quote: '', note: '', page: '' })

  const book = books.find((b) => b.id === id)
  if (!book) return <p className="empty">책을 찾을 수 없어요.</p>

  const bookRecords = records.filter((r) => r.bookId === id)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.quote.trim()) return
    addRecord({ bookId: id, quote: form.quote.trim(), note: form.note.trim(), page: Number(form.page) || null })
    setForm({ quote: '', note: '', page: '' })
  }

  const onDeleteBook = () => {
    if (confirm(`'${book.title}'과 기록을 모두 지울까요?`)) {
      removeBook(id)
      navigate('/')
    }
  }

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">{book.title}</h1>
        <p className="muted">{book.author}</p>
        <ProgressInput book={book} />
      </div>

      <form className="card stack" onSubmit={onSubmit}>
        <h2>기록 쓰기</h2>
        <textarea className="input" rows="3" placeholder="밑줄 친 문장" value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })} />
        <textarea className="input" rows="2" placeholder="그때 든 생각 (선택)" value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <input className="input" type="number" min="1" placeholder="쪽 (선택)" value={form.page}
          onChange={(e) => setForm({ ...form, page: e.target.value })} />
        <button className="btn" type="submit">기록 저장</button>
      </form>

      <section className="stack">
        <h2>이 책의 기록 {bookRecords.length}개</h2>
        {bookRecords.map((r) => <RecordCard key={r.id} record={r} onDelete={removeRecord} />)}
      </section>

      <button className="link danger" onClick={onDeleteBook}>이 책 서재에서 빼기</button>
    </div>
  )
}
