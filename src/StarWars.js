/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import { fetchUser } from './utils';

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
    [SUCCESS]: { ...s, status: SUCCESS, data, errorMessage: '' },
    [ERROR]: { ...s, status: ERROR, data: null, errorMessage },
  }[type];
};

const StarWars = () => {
  const [category, setCategory] = React.useState('people');
  const [search, setSearch] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
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

  const Component = componentMap[category];

  return (
    <form className="App-form" onSubmit={handleSubmit}>
      <h1>Star Wars Search!</h1>
      <select id="category" onChange={e => setCategory(e.target.value)}>
        <option value="people">People</option>
        <option value="films" disabled>
          Films
        </option>
        <option value="planets">Planets</option>
        <option value="starships" disabled>
          Starships
        </option>
        <option value="vehicles" disabled>
          Vehicles
        </option>
      </select>
      <input placeholder="Search" onChange={e => setSearch(e.target.value)} />
      <button type="submit">Submit</button>
      {state.status === LOADING && 'Loading...'}
      {state.data && (
        <Display
          data={state.data.results}
          currentIndex={currentIndex}
          onRequestNext={() => setCurrentIndex(i => i + 1)}
          onRequestPrev={() => setCurrentIndex(i => i - 1)}
        >
          <Component {...state.data.results[currentIndex]} />
        </Display>
      )}
      {state.status === ERROR && `Error: ${state.errorMessage}`}
      {state.data && <pre>{JSON.stringify(state.data, null, 4)}</pre>}
    </form>
  );
};

export const Display = ({
  children,
  onRequestNext,
  onRequestPrev,
  currentIndex = 0,
  data = [],
}) => (
  <div className="result">
    {children}
    <div className="result-nav">
      {data.length > 1 && currentIndex > 0 && (
        <button type="button" onClick={onRequestPrev}>
          Previous
        </button>
      )}
      <button
        type="button"
        disabled={data.length <= 1 || currentIndex >= data.length - 1}
        onClick={onRequestNext}
      >
        Next
      </button>
    </div>
  </div>
);

export const Person = ({ name, height, mass }) => {
  return (
    <ul>
      <li>Name: {name}</li>
      <li>Height: {height}</li>
      <li>Mass: {mass}</li>
    </ul>
  );
};

export const Planet = ({ name, diameter, climate, terrain }) => {
  return (
    <ul>
      <li>Name: {name}</li>
      <li>Diameter: {diameter}</li>
      <li>Climate: {climate}</li>
      <li>Terrain: {terrain}</li>
    </ul>
  );
};

const componentMap = {
  people: Person,
  planets: Planet,
  // films: Film,
  // starships: Starship,
  // vehicles: Vehicle,
};

export default StarWars;
