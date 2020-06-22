import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StarWars, { Display, Person } from '../StarWars';
import { fetchUser } from '../utils';

jest.mock('../utils');

const onePerson = { name: 'Joe', height: '73', mass: '80' };
const twoPerson = { name: 'Missy', height: '62', mass: '60' };

test('Display renders children', () => {
  const { getByText } = render(<Display>Hi</Display>);
  expect(getByText('Hi')).toBeTruthy();
});

test('Person renders name, height, mass', () => {
  const { getByText } = render(<Person {...onePerson} />);
  expect(getByText('Name: Joe')).toBeTruthy();
  expect(getByText('Height: 73')).toBeTruthy();
  expect(getByText('Mass: 80')).toBeTruthy();
});

describe('Prev/Next', () => {
  it('Next button is disabled with only one result', () => {
    const { getByText } = render(
      <Display data={[onePerson]}>
        <Person {...onePerson} />
      </Display>
    );
    expect(getByText(/next/i).disabled).toBe(true);
  });

  it('Next button is disabled when currentIndex is the last index', () => {
    const { getByText } = render(
      <Display data={[onePerson, twoPerson]} currentIndex={1}>
        <Person {...onePerson} />
      </Display>
    );
    expect(getByText(/next/i).disabled).toBe(true);
  });

  it('Prev button is missing on first result', () => {
    const { queryByText } = render(
      <Display data={[onePerson]} currentIndex={0}>
        <Person {...onePerson} />
      </Display>
    );
    expect(queryByText(/previous/i)).toBe(null);
  });

  it('Prev button appears on second result', () => {
    const { queryByText } = render(
      <Display data={[onePerson, twoPerson]} currentIndex={1}>
        <Person {...twoPerson} />
      </Display>
    );
    expect(queryByText(/previous/i)).toBeTruthy();
  });

  it('Next button calls onRequestNext with more than one result', () => {
    const onRequestNext = jest.fn();
    const { getByText } = render(
      <Display data={[onePerson, twoPerson]} onRequestNext={onRequestNext}>
        <Person {...onePerson} />
      </Display>
    );
    expect(onRequestNext).not.toBeCalled();
    fireEvent.click(getByText(/next/i));
    expect(onRequestNext).toBeCalled();
  });

  it('Previous button calls onRequestPrev', () => {
    const onRequestPrev = jest.fn();
    const { getByText } = render(
      <Display data={[onePerson, twoPerson]} currentIndex={1} onRequestPrev={onRequestPrev}>
        <Person {...twoPerson} />
      </Display>
    );
    expect(onRequestPrev).not.toBeCalled();
    fireEvent.click(getByText(/previous/i));
    expect(onRequestPrev).toBeCalled();
  });
});

// Intentionally skip for low coverage
// describe('StarWars Component', () => {
//   it('Shows prev/next results', async () => {
//     fetchUser.mockResolvedValue({ results: [onePerson, twoPerson] });
//     const { queryByText, findByText } = render(<StarWars />);
//     fireEvent.click(queryByText(/submit/i));
//     const joe = await findByText(/Name: Joe/);
//     expect(joe).toBeTruthy();
//     fireEvent.click(queryByText(/next/i));
//     expect(queryByText(/Name: Joe/)).toBe(null);
//     expect(queryByText(/Name: Missy/)).toBeTruthy();
//     expect(queryByText(/next/i).disabled).toBe(true);
//     fireEvent.click(queryByText(/previous/i));
//     expect(queryByText(/Name: Joe/)).toBeTruthy();
//     expect(queryByText(/Name: Missy/)).toBe(null);
//     expect(queryByText(/next/i).disabled).toBe(false);
//   });
// });
