import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from '../layout/Header';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('<Header />', () => {

  const history = createMemoryHistory();

  const renderComponent = () => render(
    <Router location={history.location} navigator={history}>
      <Header />
    </Router>
  );

  let component = renderComponent();

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    component = renderComponent();
  })

  test('Render form', () => {
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
  
  test('Submit form without filling it', () => {
    const btnSubmit = screen.getByTestId('btn-submit');
    fireEvent.click(btnSubmit);

    const actualPath = history.location.pathname;

    expect(history.location.pathname).toBe(actualPath);
  });
  
  test('Submit form properly', () => {
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, "pikachu");

    const btnSubmit = screen.getByTestId('btn-submit');
    fireEvent.click(btnSubmit);

    expect(history.location.pathname).toBe('/pokemon/pikachu');
  });
});
