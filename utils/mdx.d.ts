// Types for MDX utilities

export interface Blog {
  _id: string
  _raw: {
    flattenedPath: string
    sourceFilePath: string
  }
  type: 'Blog'
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  bibliography?: string
  canonicalUrl?: string
  slug: string
  path: string
  filePath: string
  toc: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
  body: {
    raw: string
    code: string
  }
  structuredData: any
}

export interface Authors {
  _id: string
  _raw: {
    flattenedPath: string
    sourceFilePath: string
  }
  type: 'Authors'
  name: string
  avatar?: string
  occupation?: string
  company?: string
  email?: string
  twitter?: string
  linkedin?: string
  github?: string
  layout?: string
  slug: string
  path: string
  filePath: string
  body: {
    raw: string
    code: string
  }
}

// Function exports
export function getAllBlogs(): Promise<Blog[]>
export function getAllAuthors(): Promise<Authors[]>
export function sortPosts(posts: Blog[]): Blog[]
export function allCoreContent(posts: Blog[]): Omit<Blog, 'body'>[]
export function coreContent<T extends Blog | Authors>(item: T): Omit<T, 'body'>
export function createTagCount(allBlogs: Blog[]): Record<string, number>
export function allBlogs(): Promise<Blog[]>
export function allAuthors(): Promise<Authors[]>
