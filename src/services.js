export const fetchUser = ({ category, search }) => {
  const baseUrl = `https://swapi.dev/api/${category.toLowerCase()}/`;
  const query = search ? `?search=${search}` : '';

  const url = `${baseUrl}${query}`;
  console.log(`url:`, url);

  return fetch(url).then(res => {
    console.log(`res:`, res);
    if (!res.ok) {
      return res.json().then(err => {
        throw err;
      });
    }
    return res.json();
  });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(`Hello ${name}, you are ${age} years old!`);
  //   }, 500);
  // });
};
