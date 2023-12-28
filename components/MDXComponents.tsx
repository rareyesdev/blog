import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'

export const components: MDXComponents = {
  Image,
  TOCInline,
  // @ts-expect-error Anchors have optional href but CustomLink requires it.
  a: CustomLink,
  // @ts-expect-error Anchors have optional children but Pre requires it.
  pre: Pre,
  BlogNewsletterForm,
}
