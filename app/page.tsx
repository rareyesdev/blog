import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import featuredQuotesData from '@/data/featuredQuotesData'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const featuredQuote =
    featuredQuotesData[Math.floor(Math.random() * featuredQuotesData.length)].quote

  return <Main posts={posts} featuredQuote={featuredQuote} />
}
