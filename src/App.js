import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import StarWars from './StarWars';
import './App.scss';

const Nav = () => {
  return (
    <div className="nav">
      <NavLink exact className="link" to="/">
        Home
      </NavLink>
      <NavLink exact className="link" to="/about">
        About
      </NavLink>
    </div>
  );
};

// Cypress doesn't give coverage on this component, but why?
const About = () => {
  return 'This is the about page!';
};

export default function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={StarWars} />
      </Switch>
    </Router>
  );
}
