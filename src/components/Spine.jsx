// 책등 하나. 쪽수가 많을수록 두껍게, 제목은 세로로 쓴다.
export default function Spine({ book, selected, onClick }) {
  const width = Math.min(48, Math.max(26, Math.round(book.pages / 14)))
  const done = book.pages > 0 && book.currentPage >= book.pages
  return (
    <button
      className={`spine spine-${book.color ?? 'cream'} ${selected ? 'is-out' : ''}`}
      style={{ width }}
      onClick={onClick}
      title={`${book.title} · ${book.author}`}
    >
      <span className="spine-title">{book.title}</span>
      {done && <span className="spine-dot" aria-label="다 읽음" />}
    </button>
  )
}
