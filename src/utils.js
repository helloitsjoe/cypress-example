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
    return res.json();
  });
};

export const foo = 'bar';
