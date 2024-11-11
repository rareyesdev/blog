import featuredQuotesData from '@/data/featuredQuotesData'
import notFeaturedQuotesData from '@/data/notFeaturedQuotesData'
import { genPageMetadata } from 'app/seo'

const allQuotesData = [...featuredQuotesData, ...notFeaturedQuotesData]

export const metadata = genPageMetadata({ title: 'Quotes' })

export default function Page() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Quotes
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A list of my favorite quotes.
        </p>
      </div>
      <div>
        <div className="pt-12 space-y-12 md:mx-auto md:max-w-2xl">
          {allQuotesData.map(({ quote, author }) => (
            <blockquote key={quote}>
              <p className="italic">"{quote}"</p>
              <p className="text-right">{author}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  )
}
