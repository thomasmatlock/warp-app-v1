export default function formatTitle(title: string) {
  title = title.replace(`|`, '');
  title = title.replace(`|`, '');
  title = title.replace(`"`, '');
  title = title.replace(`"`, '');
  title = title.replace(`'`, '');
  title = title.replace(`?`, '');
  title = title.replace(`!`, '');
  title = title.replace(`\\`, '');
  title = title.replace(`/`, ' ');
  title = title.replace(`*`, '');
  title = title.replace(`#`, ' ');
  // title = title.replace(`:`, ' ');
  // title = title.replace(`,`, '');
  // title = title.replace(`<`, ' ');
  // title = title.replace(`>`, ' ');
  return title;
}
