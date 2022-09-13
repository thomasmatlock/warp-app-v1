export default async function BrowserQuery(currentURL, query) {
  if (currentURL.includes('youtube')) {
    let prefixURL = 'https://www.youtube.com/results?search_query=';
    return prefixURL + query;
  }
}
