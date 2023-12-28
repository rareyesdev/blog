import favoriteReadingsData from '@/data/favoriteReadingsData'
import { genPageMetadata } from 'app/seo'
import { Shelf } from './shelf'

export const metadata = genPageMetadata({ title: 'Readings' })

export default function Page() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Favorite Readings
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          This is a list of my favorite readings. I don't put every book that I read, only the best
          ones make it.
        </p>
      </div>
      <div className="container py-12">
        <Shelf favoriteReadingsData={favoriteReadingsData} />
      </div>
    </div>
  )
}
