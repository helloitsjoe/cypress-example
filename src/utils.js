/* eslint-disable no-use-before-define */
export const fetchUser = ({ category, ...params }) => {
  const baseUrl = `https://swapi.dev/api/${category}/`;
  const queryParams = Object.entries(params)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');

  const query = queryParams ? `?${queryParams}` : '';

  const url = `${baseUrl}${query}`;

  return fetch(url).then(res => {
    if (!res.ok) {
      return res.json().then(err => {
        throw err;
      });
    }

    return res
      .text()
      .then(data => JSON.parse(dewookify(data)))
      .catch(err => {
        console.error('error dewookifying', err);
      });
  });
};

export const dewookify = data => {
  const wookMap = {
    oaoohuwhao: 'count',
    whhuanan: 'null',
    akrcwohoahoohuc: 'previous',
    rcwochuanaoc: 'results',
    whwokao: 'next',
    akwoooakanwo: 'people',
    akrarrwo: 'page',
    wwoorcscraao: 'format',
    ohooooorahwowo: 'wookiee',
    cworarcoaac: 'search',
    whrascwo: 'name',
    acwoahrracao: 'height',
    scracc: 'mass',
    acraahrc: 'hair',
    corahwh: 'skin',
    worowo: 'eye',
    oaooanoorc: 'color',
    rhahrcaoac_roworarc: 'birth_year',
    rrwowhwaworc: 'gender',
    acooscwoohoorcanwa: 'homeworld',
    akanrawhwoaoc: 'planets',
    wwahanscc: 'films',
    cakwooaahwoc: 'species',
    howoacahoaanwoc: 'vehicles',
    caorarccacahakc: 'starships',
    oarcworaaowowa: 'created',
    wowaahaowowa: 'edited',
    hurcan: 'url',
    'wh/ra': 'n/a',
    'acaoaoak://cohraakah.wawoho/raakah': 'http://swapi.dev/api',
  };
  // TODO: Translate paginated search: ?search=TRANSLATE_ME
  // This applies to next/previous results, e.g. search for a single letter
  return Object.entries(wookMap).reduce((text, [key, value]) => {
    return text.replace(new RegExp(key, 'g'), value);
  }, data);
};
