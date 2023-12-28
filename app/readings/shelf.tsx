import React, { FC, useMemo } from 'react'
import { MedalIcon } from './medal-icon'
import { BookIcon } from './book-icon'
import Link from '../../components/Link'

const colors = {
  platinum: '#ffffff',
  gold: '#ffd300',
  silver: '#9a9a9a',
  bronze: '#ab7627',
}

type ShelfProps = {
  favoriteReadingsData: any
}

export const Shelf: FC<ShelfProps> = ({ favoriteReadingsData }) => {
  const rowNames = useMemo(() => Object.keys(favoriteReadingsData), [favoriteReadingsData])

  return (
    <div className="space-y-12">
      {rowNames.map((rowName) => (
        <ShelfRow key={rowName} readings={favoriteReadingsData[rowName]} color={colors[rowName]} />
      ))}
    </div>
  )
}

type Reading = {
  title: string
  url?: string
}

type ShelfRowProps = {
  color: string
  readings: Reading[]
}

const ShelfRow: FC<ShelfRowProps> = ({ color, readings }) => {
  return (
    <div className="md:flex md:items-center">
      <MedalIcon className="h-14 mb-4 mx-auto md:m-0 md:mr-10" style={{ color }} />
      <ul className="m-0 p-0 list-none">
        {readings.map((reading) => {
          const item = (
            <li key={reading.title} className="relative leading-loose">
              <BookIcon className="absolute translate-y-2/4 h-3 top-1" />
              <div className="ml-5">{reading.title}</div>
            </li>
          )

          return reading.url ? (
            <Link href={reading.url} target="_blank" rel="noopener noreferrer">
              {item}
            </Link>
          ) : (
            item
          )
        })}
      </ul>
    </div>
  )
}
