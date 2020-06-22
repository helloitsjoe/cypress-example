import React from 'react';
import { render } from '@testing-library/react';
import { Display, Person } from '../StarWars';

test('Display renders children', () => {
  const { getByText } = render(<Display>Hi</Display>);
  expect(getByText('Hi')).toBeTruthy();
});

test('Person renders name, height, mass', () => {
  const { getByText } = render(<Person {...{ name: 'Joe', height: '73', mass: '80' }} />);
  expect(getByText('Name: Joe')).toBeTruthy();
  expect(getByText('Height: 73')).toBeTruthy();
  expect(getByText('Mass: 80')).toBeTruthy();
});
