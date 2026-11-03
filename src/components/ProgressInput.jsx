import { useLibrary } from '../hooks/LibraryContext.jsx'

// 슬라이더 하나로 진도를 바로 갱신한다
export default function ProgressInput({ book }) {
  const { updateProgress } = useLibrary()
  return (
    <label className="progress">
      <span className="small">{book.currentPage} / {book.pages}쪽</span>
      <input
        type="range"
        min="0"
        max={book.pages}
        value={book.currentPage}
        onChange={(e) => updateProgress(book.id, Number(e.target.value))}
      />
    </label>
  )
}
