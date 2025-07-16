import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from '@/utils/mdx'
import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from '@/utils/mdx'
import tagData from 'app/tag-data.json'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  const blogs = await allBlogs()
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(blogs.filter((post) => post.tags.map((t) => slug(t)).includes(tag)))
  )

  return <ListLayout posts={filteredPosts} title={title} />
}
