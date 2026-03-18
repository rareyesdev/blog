import { Authors, allAuthors } from '@/utils/mdx'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from '@/utils/mdx'
import { genPageMetadata } from 'app/seo'
import SimpleMarkdownRenderer from '@/components/SimpleMarkdownRenderer'

export const metadata = genPageMetadata({ title: 'About' })

export default async function Page() {
  const authors = await allAuthors()
  const author = authors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)
  const yearsOfExperience = new Date().getFullYear() - 2015
  const aboutContent = author.body.raw.replace('{{yearsOfExperience}}', String(yearsOfExperience))

  return (
    <>
      <AuthorLayout content={mainContent}>
        <SimpleMarkdownRenderer
          content={aboutContent}
          className="prose max-w-none dark:prose-invert"
        />
      </AuthorLayout>
    </>
  )
}
