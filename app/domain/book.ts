export type Book = {
  title: string
  author?: string[]
}

export type ReadingData = {
  platinum: Book[]
  gold: Book[]
  silver: Book[]
  bronze: Book[]
}
