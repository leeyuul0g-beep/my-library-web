export default function RecordCard({ record, bookTitle, onDelete }) {
  const date = new Date(record.createdAt).toLocaleDateString('ko-KR')
  return (
    <article className="record">
      <blockquote>“{record.quote}”</blockquote>
      {record.note && <p className="record-note">{record.note}</p>}
      <footer className="muted small">
        {bookTitle && <span>{bookTitle} · </span>}
        {record.page ? `${record.page}쪽 · ` : ''}{date}
        {onDelete && <button className="link small" onClick={() => onDelete(record.id)}>삭제</button>}
      </footer>
    </article>
  )
}
