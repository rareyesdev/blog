import { allBlogs } from '@/utils/mdx'
import siteMetadata from '@/data/siteMetadata'

export default async function sitemap() {
  const siteUrl = siteMetadata.siteUrl
  const blogs = await allBlogs()

  const blogRoutes = blogs.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
