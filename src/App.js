import React from 'react';
import { fetchUser } from './services';
import './App.scss';

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

const initialState = {
  status: IDLE,
  errorMessage: '',
  data: null,
};

const fetchReducer = (s = initialState, a) => {
  const { type, errorMessage, data } = a;
  return {
    [LOADING]: { ...s, status: LOADING, data: null, errorMessage: '' },
    [SUCCESS]: { ...s, status: SUCCESS, data: JSON.stringify(data, null, 4), errorMessage: '' },
    [ERROR]: { ...s, status: ERROR, data: null, errorMessage },
  }[type];
};

const App = () => {
  const [category, setCategory] = React.useState('people');
  const [search, setSearch] = React.useState('');
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    fetchUser({ category, search })
      .then(data => {
        dispatch({ type: SUCCESS, data });
      })
      .catch(err => {
        dispatch({ type: ERROR, errorMessage: err.message });
      });
  };

  return (
    <form className="App-form" onSubmit={handleSubmit}>
      <h1>Star Wars Search!</h1>
      <select id="category" onChange={e => setCategory(e.target.value)}>
        <option value="people">People</option>
        <option value="films">Films</option>
        <option value="planets">Planets</option>
        <option value="species">Species</option>
        <option value="starships">Starships</option>
        <option value="vehicles">Vehicles</option>
      </select>
      <input placeholder="Search" onChange={e => setSearch(e.target.value)} />
      <button type="submit">Submit</button>
      <pre className="App-loading">{state.status === LOADING ? 'Loading...' : state.data}</pre>
    </form>
  );
};

export default App;
