import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.__NEXT_PRIVATE_ORIGIN

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    const port = process.env.PORT || '3000'
    url = `http://localhost:${port}`
  }

  return url
}

export const getClientSideURL = () => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL
  if (envUrl) {
    return envUrl
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (canUseDOM) {
    const { protocol, hostname, port } = window.location
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`
  }

  const fallbackPort = process.env.PORT || '3000'
  return `http://localhost:${fallbackPort}`
}
