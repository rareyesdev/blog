import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts, allBlogs } from '@/utils/mdx'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const blogs = await allBlogs()
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page({ params }: { params: { page: string } }) {
  const blogs = await allBlogs()
  const posts = allCoreContent(sortPosts(blogs))
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
