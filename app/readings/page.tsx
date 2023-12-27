import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PostLayout from '@/layouts/PostLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { components } from '@/components/MDXComponents'

export const metadata = genPageMetadata({ title: 'Readings' })

export default function Page() {
  return (
    <div>
      <div>favorite readings</div>
    </div>
  )
}
