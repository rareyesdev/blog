import { FC } from 'react'
import { Badge } from './Badge'
import Image from './Image'
import Link from './Link'

type CardsProps = {
  title: string
  description: string
  imgSrc?: string
  href?: string
  badges?: string[]
}

const Card: FC<CardsProps> = ({ title, description, imgSrc, href, badges }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none dark:prose-invert">{description}</p>
        {badges && (
          <div className="mb-3 flex flex-wrap gap-y-2">
            {badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
        )}
        {href && (
          <Link
            href={href}
            className="link-highlighted font-medium leading-6"
            aria-label={`Link to ${title}`}
          >
            See more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
