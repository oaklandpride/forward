addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, search } = url
  const destinationURL = `https://oaklandprideofficial.org${pathname}${search}`
  return Response.redirect(destinationURL, 301)
}