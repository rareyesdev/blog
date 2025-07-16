import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'

// Helper function to extract TOC from markdown content
function extractTocHeadings(content) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const anchor = slug(text)

    headings.push({
      level,
      text,
      anchor,
    })
  }

  return JSON.stringify(headings)
}

// Simple function to prepare MDX content for rendering
// We'll use a simpler approach that's compatible with pliny's MDXLayoutRenderer
function prepareMDXContent(content) {
  // For now, we'll return the raw content and let Next.js handle the MDX compilation
  // This is much simpler and avoids the complex compilation issues
  return content
}

// Function to read and parse a single MDX file
async function parseMDXFile(filePath, contentDir) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)

    const relativePath = path.relative(contentDir, filePath)
    const pathWithoutExtension = relativePath.replace(/\.mdx?$/, '')
    const slugPath = pathWithoutExtension.replace(/^[^/]+\//, '') // Remove the first directory (blog/ or authors/)

    const isAuthor = relativePath.startsWith('authors/')
    const type = isAuthor ? 'Authors' : 'Blog'

    // Prepare MDX content for rendering
    const preparedCode = prepareMDXContent(content)

    const baseData = {
      _id: filePath,
      _raw: {
        flattenedPath: pathWithoutExtension,
        sourceFilePath: relativePath,
      },
      type,
      slug: slugPath,
      path: pathWithoutExtension,
      filePath,
      body: {
        raw: content,
        code: preparedCode,
      },
      ...frontmatter,
    }

    if (isAuthor) {
      return {
        ...baseData,
        name: frontmatter.name || '',
      }
    } else {
      const readingTimeData = readingTime(content)
      const toc = extractTocHeadings(content)

      return {
        ...baseData,
        title: frontmatter.title || '',
        date: frontmatter.date || '',
        tags: frontmatter.tags || [],
        readingTime: readingTimeData,
        toc,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: frontmatter.title,
          datePublished: frontmatter.date,
          dateModified: frontmatter.lastmod || frontmatter.date,
          description: frontmatter.summary,
          image: frontmatter.images ? frontmatter.images[0] : '/static/images/twitter-card.png',
          url: `https://rareyesdev.com/${pathWithoutExtension}`,
          author: frontmatter.authors || ['default'],
        },
      }
    }
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error)
    return null
  }
}

// Function to get all MDX files from a directory
function getAllMDXFiles(dir) {
  const files = []

  function traverseDir(currentDir) {
    const items = fs.readdirSync(currentDir)

    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        traverseDir(fullPath)
      } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  }

  traverseDir(dir)
  return files
}

// Main function to get all blogs
export async function getAllBlogs() {
  const contentDir = path.join(process.cwd(), 'data')
  const blogDir = path.join(contentDir, 'blog')

  if (!fs.existsSync(blogDir)) {
    return []
  }

  const mdxFiles = getAllMDXFiles(blogDir)
  const blogs = []

  for (const file of mdxFiles) {
    const parsed = await parseMDXFile(file, contentDir)
    if (parsed && parsed.type === 'Blog') {
      blogs.push(parsed)
    }
  }

  return blogs
}

// Main function to get all authors
export async function getAllAuthors() {
  const contentDir = path.join(process.cwd(), 'data')
  const authorsDir = path.join(contentDir, 'authors')

  if (!fs.existsSync(authorsDir)) {
    return []
  }

  const mdxFiles = getAllMDXFiles(authorsDir)
  const authors = []

  for (const file of mdxFiles) {
    const parsed = await parseMDXFile(file, contentDir)
    if (parsed && parsed.type === 'Authors') {
      authors.push(parsed)
    }
  }

  return authors
}

// Utility functions to replace pliny/utils/contentlayer functions
export function sortPosts(posts) {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA // Most recent first
  })
}

export function allCoreContent(posts) {
  return posts.map(post => {
    const { body, ...coreContent } = post
    return coreContent
  })
}

export function coreContent(item) {
  if (!item) {
    return null
  }
  const { body, ...core } = item
  return core
}

// Function to create tag count (replaces contentlayer onSuccess callback)
export function createTagCount(allBlogs) {
  const tagCount = {}

  allBlogs.forEach((blog) => {
    if (blog.tags && (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production' || blog.draft !== true)) {
      blog.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}

// Cache for performance
let blogCache = null
let authorsCache = null

export const allBlogs = async () => {
  if (!blogCache) {
    blogCache = await getAllBlogs()
  }
  return blogCache
}

export const allAuthors = async () => {
  if (!authorsCache) {
    authorsCache = await getAllAuthors()
  }
  return authorsCache
}
