// 도서 검색: Open Library 공개 API (키 없이 사용 가능)
// https://openlibrary.org/dev/docs/api/search
const SEARCH_URL = 'https://openlibrary.org/search.json'
const FIELDS = 'key,title,author_name,number_of_pages_median,cover_i,isbn'

// 하이픈을 뺀 10자리 또는 13자리 숫자면 ISBN으로 본다 (책 뒷면 바코드 아래 숫자)
export function toIsbn(text) {
  const digits = text.replace(/[-\s]/g, '')
  return /^(\d{9}[\dXx]|\d{13})$/.test(digits) ? digits : null
}

export function coverUrl(coverId, size = 'M') {
  return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg` : null
}

export async function searchBooks(keyword, { signal } = {}) {
  const isbn = toIsbn(keyword)
  const params = new URLSearchParams({
    q: isbn ? `isbn:${isbn}` : keyword.trim(),
    fields: FIELDS,
    limit: '10',
  })
  const res = await fetch(`${SEARCH_URL}?${params}`, { signal })
  if (!res.ok) throw new Error(`검색 실패 (${res.status})`)
  const data = await res.json()

  return data.docs.map((doc) => ({
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? '',
    pages: doc.number_of_pages_median ?? null,
    coverUrl: coverUrl(doc.cover_i),
    isbn: isbn ?? doc.isbn?.find((n) => n.length === 13) ?? null,
  }))
}
