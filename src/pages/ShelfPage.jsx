import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLibrary } from '../hooks/LibraryContext.jsx'
import Spine from '../components/Spine.jsx'
import Drawer from '../components/Drawer.jsx'

const PER_ROW = 4

export default function ShelfPage() {
  const { books, records } = useLibrary()
  const [selectedId, setSelectedId] = useState(null)

  if (books.length === 0) {
    return (
      <div className="empty">
        <p>아직 꽂힌 책이 없어요.</p>
        <Link to="/add" className="btn">첫 책 담기</Link>
      </div>
    )
  }

  // 책을 한 줄에 PER_ROW권씩 나눈다
  const rows = []
  for (let i = 0; i < books.length; i += PER_ROW) rows.push(books.slice(i, i + PER_ROW))

  const selected = books.find((b) => b.id === selectedId)

  return (
    <div>
      <p className="muted small">전체 {books.length}권</p>
      {rows.map((row, idx) => (
        <Fragment key={idx}>
          <div className="shelf-row">
            {row.map((book) => (
              <Spine
                key={book.id}
                book={book}
                selected={book.id === selectedId}
                onClick={() => setSelectedId(book.id === selectedId ? null : book.id)}
              />
            ))}
          </div>
          {selected && row.includes(selected) && (
            <Drawer
              book={selected}
              recordCount={records.filter((r) => r.bookId === selected.id).length}
              onClose={() => setSelectedId(null)}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}
