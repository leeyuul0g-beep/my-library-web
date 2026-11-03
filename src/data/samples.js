// 처음 실행했을 때 화면이 비어 보이지 않도록 넣어 둔 예시 데이터
export const sampleBooks = [
  { id: 'b1', title: '데미안', author: '헤르만 헤세', pages: 248, currentPage: 100, color: 'ochre', addedAt: '2026-10-02T09:00:00Z' },
  { id: 'b2', title: '어린 왕자', author: '앙투안 드 생텍쥐페리', pages: 144, currentPage: 144, color: 'sage', addedAt: '2026-09-20T09:00:00Z' },
  { id: 'b3', title: '아몬드', author: '손원평', pages: 264, currentPage: 30, color: 'cream', addedAt: '2026-10-20T09:00:00Z' },
  { id: 'b4', title: '코스모스', author: '칼 세이건', pages: 584, currentPage: 210, color: 'rose', addedAt: '2026-08-11T09:00:00Z' },
  { id: 'b5', title: '불편한 편의점', author: '김호연', pages: 268, currentPage: 268, color: 'rose', addedAt: '2026-07-01T09:00:00Z' },
  { id: 'b6', title: '사피엔스', author: '유발 하라리', pages: 636, currentPage: 0, color: 'brown', addedAt: '2026-10-28T09:00:00Z' },
]

export const sampleRecords = [
  { id: 'r1', bookId: 'b1', page: 98, quote: '새는 알에서 나오려고 투쟁한다.', note: '처음 읽었을 때보다 지금 더 와닿는다.', createdAt: '2026-10-05T12:00:00Z' },
  { id: 'r2', bookId: 'b2', page: 92, quote: '가장 중요한 것은 눈에 보이지 않아.', note: '', createdAt: '2026-09-22T12:00:00Z' },
  { id: 'r3', bookId: 'b4', page: 7, quote: '우리는 별의 물질로 이루어져 있다.', note: '밤에 산책하다가 다시 생각남.', createdAt: '2026-08-15T12:00:00Z' },
]
