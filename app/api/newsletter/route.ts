// import { NewsletterAPI } from 'pliny/newsletter'
// import siteMetadata from '@/data/siteMetadata'

// const handler = NewsletterAPI({
//   provider: siteMetadata.newsletter.provider,
// })

const handler = () => {
  return Response.json({ message: 'This API route is currently inactive.' })
}

export { handler as GET, handler as POST }
