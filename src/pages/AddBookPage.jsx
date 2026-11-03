import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/LibraryContext.jsx'
import useBookSearch from '../hooks/useBookSearch.js'
import { toIsbn } from '../api/bookSearch.js'

const COLORS = ['ochre', 'sage', 'rose', 'cream', 'brown', 'navy']

export default function AddBookPage() {
  const { addBook } = useLibrary()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [form, setForm] = useState({ title: '', author: '', pages: '' })
  const { results, status } = useBookSearch(keyword)

  const save = (book) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const { id: _searchId, ...rest } = book
    addBook({ ...rest, pages: Number(book.pages) || 200, color })
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

      <section className="card stack">
        <h2>검색해서 담기</h2>
        <input
          className="input"
          placeholder="제목, 저자 또는 ISBN(바코드 숫자)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {toIsbn(keyword) && <p className="muted small">ISBN으로 찾는 중이에요.</p>}
        {status === 'loading' && <p className="muted small">찾는 중…</p>}
        {status === 'offline' && <p className="muted small">인터넷 연결이 없어 예시 목록에서 찾았어요.</p>}
        {status === 'done' && results.length === 0 && (
          <p className="muted small">검색 결과가 없어요. 아래에서 직접 입력해 주세요.</p>
        )}
        <ul className="results">
          {results.map((book) => (
            <li key={book.id}>
              {book.coverUrl
                ? <img className="result-cover" src={book.coverUrl} alt="" loading="lazy" />
                : <div className="result-cover placeholder" aria-hidden="true" />}
              <div className="result-info">
                <strong>{book.title}</strong>
                <span className="muted small">
                  {[book.author, book.pages && `${book.pages}쪽`].filter(Boolean).join(' · ')}
                </span>
              </div>
              <button className="btn small" onClick={() => save(book)}>담기</button>
            </li>
          ))}
        </ul>
        <p className="muted small">도서 정보: Open Library</p>
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
