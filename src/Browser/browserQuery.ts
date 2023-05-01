export default async function BrowserQuery(currentURL: string, query: string) {
  if (currentURL.includes('youtube')) {
    const prefixURL = 'https://www.youtube.com/results?search_query=';
    return prefixURL + query;
  }
}
