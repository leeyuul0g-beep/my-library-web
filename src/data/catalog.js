// 책 검색용 예시 목록
// 실제 서비스에서는 도서 검색 API(예: 국립중앙도서관 Open API)로 바꿀 예정
export const catalog = [
  { title: '데미안', author: '헤르만 헤세', pages: 248 },
  { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', pages: 144 },
  { title: '아몬드', author: '손원평', pages: 264 },
  { title: '코스모스', author: '칼 세이건', pages: 584 },
  { title: '불편한 편의점', author: '김호연', pages: 268 },
  { title: '사피엔스', author: '유발 하라리', pages: 636 },
  { title: '달러구트 꿈 백화점', author: '이미예', pages: 300 },
  { title: '작별하지 않는다', author: '한강', pages: 332 },
  { title: '소년이 온다', author: '한강', pages: 216 },
  { title: '채식주의자', author: '한강', pages: 247 },
  { title: '82년생 김지영', author: '조남주', pages: 192 },
  { title: '미드나잇 라이브러리', author: '매트 헤이그', pages: 400 },
  { title: '총, 균, 쇠', author: '재레드 다이아몬드', pages: 752 },
  { title: '1984', author: '조지 오웰', pages: 400 },
  { title: '동물농장', author: '조지 오웰', pages: 144 },
  { title: '나미야 잡화점의 기적', author: '히가시노 게이고', pages: 456 },
  { title: '긴긴밤', author: '루리', pages: 144 },
  { title: '파친코', author: '이민진', pages: 368 },
  { title: '이기적 유전자', author: '리처드 도킨스', pages: 632 },
  { title: '인간 실격', author: '다자이 오사무', pages: 192 },
]

export function searchCatalog(keyword) {
  const q = keyword.trim().toLowerCase()
  if (!q) return []
  return catalog.filter(
    (book) => book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q),
  )
}
