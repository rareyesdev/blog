import 'css/prism.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { sortPosts, coreContent, allCoreContent, allBlogs, allAuthors } from '@/utils/mdx'
import type { Authors, Blog } from '@/utils/mdx'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import SimpleMarkdownRenderer from '@/components/SimpleMarkdownRenderer'

const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

type LayoutMap = typeof layouts
type LayoutKeys = keyof LayoutMap

const getLayoutWithFallback = (layout: string | undefined): LayoutMap[LayoutKeys] => {
  if (!layout) {
    return PostLayout
  }
  if (layout in layouts) {
    return layouts[layout as keyof typeof layouts]
  }
  throw new Error(`Invalid layout: ${layout}`)
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const blogs = await allBlogs()
  const post = blogs.find((p) => p.slug === slug)

  if (!post) {
    return
  }

  const authorList = post?.authors || ['default']
  const authors = await allAuthors()
  const authorDetails = authorList
    .map((author) => {
      const authorResults = authors.find((p) => p.slug === author)
      return coreContent(authorResults as Authors)
    })
    .filter(Boolean)

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authorNames = authorDetails.map((author) => author?.name).filter(Boolean)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authorNames.length > 0 ? authorNames : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const blogs = await allBlogs()
  const paths = blogs.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const blogs = await allBlogs()
  const sortedCoreContents = allCoreContent(sortPosts(blogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
      </div>
    )
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = blogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authors = await allAuthors()
  const authorDetails = authorList
    .map((author) => {
      const authorResults = authors.find((p) => p.slug === author)
      return coreContent(authorResults as Authors)
    })
    .filter(Boolean)
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = getLayoutWithFallback(post.layout)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <SimpleMarkdownRenderer
          content={post.body.raw}
          className="prose max-w-none dark:prose-invert"
        />
      </Layout>
    </>
  )
}
