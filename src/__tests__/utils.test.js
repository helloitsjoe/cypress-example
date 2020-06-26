import { fetchUser } from '../utils';

test('fetch util combines params', async () => {
  window.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve() });
  await fetchUser({ category: 'foo', search: 'bar', format: 'baz' });
  expect(window.fetch).toBeCalledWith('https://swapi.dev/api/foo/?search=bar&format=baz');
  jest.clearAllMocks();
});
