export function createAnimeApiUrl(_url: URL) {
  const queryParams = [..._url.searchParams.entries()]
  const searchType = _url.searchParams.get('searchType')
  const jikanUrl = new URL(import.meta.env.ANIME_API + '/' + searchType)
  queryParams.forEach(([key, value]) => {
    if (key === 'searchType') return;
    jikanUrl.searchParams.set(key, value)
  })
  return jikanUrl;
}
