export const fetchUser = ({ category, search }) => {
  const baseUrl = `https://swapi.dev/api/${category}/`;
  const query = search ? `?search=${search}` : '';

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
