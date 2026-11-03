import { Link } from 'react-router-dom'
import { useLibrary } from '../hooks/LibraryContext.jsx'

export default function Header() {
  const { mono, toggleMono } = useLibrary()
  return (
    <header className="header">
      <Link to="/" className="logo">내 서재</Link>
      <div className="header-actions">
        <button className="chip" onClick={toggleMono} aria-pressed={mono}>
          {mono ? '컬러' : '흑백'}
        </button>
        <Link to="/add" className="chip">책 담기</Link>
      </div>
    </header>
  )
}
