import { allBlogs } from '@/utils/mdx'
import { sortPosts, allCoreContent } from '@/utils/mdx'
import Main from './Main'

export default async function Page() {
  const blogs = await allBlogs()
  const posts = allCoreContent(sortPosts(blogs))
  return <Main posts={posts} />
}
