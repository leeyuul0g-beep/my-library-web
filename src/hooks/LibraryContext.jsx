import { createContext, useContext } from 'react'
import useLocalStorage from './useLocalStorage.js'
import { sampleBooks, sampleRecords } from '../data/samples.js'

const LibraryContext = createContext(null)

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

export function LibraryProvider({ children }) {
  const [books, setBooks] = useLocalStorage('my-library:books', sampleBooks)
  const [records, setRecords] = useLocalStorage('my-library:records', sampleRecords)
  const [mono, setMono] = useLocalStorage('my-library:mono', false)

  const addBook = (book) => {
    const created = { id: newId(), currentPage: 0, addedAt: new Date().toISOString(), ...book }
    setBooks((prev) => [created, ...prev])
    return created
  }

  const updateProgress = (bookId, currentPage) => {
    setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, currentPage } : b)))
  }

  const removeBook = (bookId) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId))
    setRecords((prev) => prev.filter((r) => r.bookId !== bookId))
  }

  const addRecord = (record) => {
    setRecords((prev) => [{ id: newId(), createdAt: new Date().toISOString(), ...record }, ...prev])
  }

  const removeRecord = (recordId) => {
    setRecords((prev) => prev.filter((r) => r.id !== recordId))
  }

  const value = {
    books, records, mono,
    toggleMono: () => setMono((m) => !m),
    addBook, updateProgress, removeBook, addRecord, removeRecord,
  }
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  return useContext(LibraryContext)
}
