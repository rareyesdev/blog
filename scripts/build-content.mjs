#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAllBlogs, createTagCount, allCoreContent, sortPosts } from '../utils/mdx.js'
import siteMetadata from '../data/siteMetadata.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Helper function for stable JSON stringify
function stableStringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort())
}

async function buildContent() {
  console.log('Building content...')

  try {
    // Get all blogs
    const blogs = await getAllBlogs()
    console.log(`Found ${blogs.length} blog posts`)

    // Generate tag count
    const tagCount = createTagCount(blogs)
    const tagDataPath = path.join(process.cwd(), 'app/tag-data.json')
    fs.writeFileSync(tagDataPath, stableStringify(tagCount))
    console.log('Generated tag-data.json')

    // Generate search index if configured
    if (
      siteMetadata?.search?.provider === 'kbar' &&
      siteMetadata.search.kbarConfig.searchDocumentsPath
    ) {
      const searchData = allCoreContent(sortPosts(blogs))
      const searchPath = path.join(process.cwd(), 'public', siteMetadata.search.kbarConfig.searchDocumentsPath)
      fs.writeFileSync(searchPath, JSON.stringify(searchData))
      console.log('Generated search index')
    }

    console.log('Content build completed successfully!')
  } catch (error) {
    console.error('Error building content:', error)
    process.exit(1)
  }
}

buildContent()
