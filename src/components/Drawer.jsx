import { Link } from 'react-router-dom'
import ProgressInput from './ProgressInput.jsx'
import Cover from './Cover.jsx'

// 책을 누르면 그 줄 아래에 열리는 서랍
export default function Drawer({ book, recordCount, onClose }) {
  const percent = book.pages ? Math.round((book.currentPage / book.pages) * 100) : 0
  return (
    <section className="drawer">
      <Cover book={book} className="drawer-cover" />
      <div className="drawer-body">
        <p className="eyebrow">서재에서 꺼낸 책</p>
        <h2>{book.title}</h2>
        <p className="muted">{book.author} · 기록 {recordCount}개</p>
        <ProgressInput book={book} />
        <p className="muted small">{percent}% 읽음</p>
        <div className="row">
          <Link to={`/books/${book.id}`} className="btn">기록 쓰기</Link>
          <button className="link" onClick={onClose}>제자리에 꽂기</button>
        </div>
      </div>
    </section>
  )
}
