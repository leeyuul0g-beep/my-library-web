// 표지 사진이 있으면 사진을, 없으면 책등 색에 제목을 써서 보여 준다
export default function Cover({ book, className = '' }) {
  if (book.coverUrl) {
    return <img className={`cover ${className}`} src={book.coverUrl} alt={`${book.title} 표지`} />
  }
  return <div className={`cover cover-text spine-${book.color ?? 'cream'} ${className}`}>{book.title}</div>
}
