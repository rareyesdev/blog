'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypePrismPlus from 'rehype-prism-plus'
import { visit } from 'unist-util-visit'
import Pre from 'pliny/ui/Pre'

interface SimpleMarkdownRendererProps {
  content: string
  className?: string
}

// Custom plugin to handle language:filename format
const preprocessLanguageIdentifiers = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'code' && node.properties && node.properties.className) {
        const className = node.properties.className[0]
        if (typeof className === 'string' && className.startsWith('language-')) {
          // Extract language from format like "language-typescript:filename"
          const languagePart = className.replace('language-', '').split(':')[0]
          node.properties.className = [`language-${languagePart}`]
        }
      }
    })
  }
}

export default function SimpleMarkdownRenderer({
  content,
  className,
}: SimpleMarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          preprocessLanguageIdentifiers,
          [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rehypePrismPlus as any,
            {
              // Handle language:filename format by extracting just the language
              ignoreMissing: true,
              // Custom language detection to handle language:filename format
              transformInlineCode: false,
            },
          ],
        ]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pre: ({ children, ...props }: any) => {
            return <Pre {...props}>{children}</Pre>
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: ({ children, className, ...props }: any) => {
            // For inline code (no className means it's inline)
            if (!className) {
              return (
                <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            }
            // For code blocks, return as-is since rehype-prism-plus will have processed it
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mb-4" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-bold mb-3" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-bold mb-2" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-4" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-4" {...props}>
              {children}
            </ol>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props}>
              {children}
            </blockquote>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
