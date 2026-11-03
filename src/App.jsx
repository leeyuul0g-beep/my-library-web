import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import TabBar from './components/TabBar.jsx'
import ShelfPage from './pages/ShelfPage.jsx'
import AddBookPage from './pages/AddBookPage.jsx'
import BookPage from './pages/BookPage.jsx'
import RecordsPage from './pages/RecordsPage.jsx'
import { useLibrary } from './hooks/LibraryContext.jsx'

export default function App() {
  const { mono } = useLibrary()
  return (
    <div className={mono ? 'app mono' : 'app'}>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<ShelfPage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/records" element={<RecordsPage />} />
        </Routes>
      </main>
      <TabBar />
    </div>
  )
}
