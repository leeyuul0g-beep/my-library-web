import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/LibraryContext.jsx'
import { searchCatalog } from '../data/catalog.js'

const COLORS = ['ochre', 'sage', 'rose', 'cream', 'brown', 'navy']

export default function AddBookPage() {
  const { addBook } = useLibrary()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [form, setForm] = useState({ title: '', author: '', pages: '' })

  const results = searchCatalog(keyword)

  const save = (book) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    addBook({ ...book, pages: Number(book.pages) || 100, color })
    navigate('/')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    save(form)
  }

  return (
    <div className="stack">
      <h1 className="page-title">책 담기</h1>

      <section className="card">
        <h2>검색해서 담기</h2>
        <input
          className="input"
          placeholder="제목이나 저자로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {keyword && results.length === 0 && <p className="muted small">검색 결과가 없어요. 아래에서 직접 입력해 주세요.</p>}
        <ul className="results">
          {results.map((book) => (
            <li key={book.title}>
              <div>
                <strong>{book.title}</strong>
                <span className="muted small"> · {book.author} · {book.pages}쪽</span>
              </div>
              <button className="btn small" onClick={() => save(book)}>담기</button>
            </li>
          ))}
        </ul>
      </section>

      <form className="card stack" onSubmit={onSubmit}>
        <h2>직접 입력하기</h2>
        <input className="input" placeholder="제목 (필수)" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="input" placeholder="저자" value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input className="input" type="number" min="1" placeholder="전체 쪽수" value={form.pages}
          onChange={(e) => setForm({ ...form, pages: e.target.value })} />
        <button className="btn" type="submit">서재에 꽂기</button>
      </form>
    </div>
  )
}
