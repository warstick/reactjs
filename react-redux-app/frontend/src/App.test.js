import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, fireEvent, screen, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import App from './App';
import rootReducer from './reducers';

jest.mock('axios');

function renderWithRedux(
  ui,
  { store = createStore(rootReducer) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

test('renders App with available label and States Dropdown', () => {
  const { getByText, getByTestId } = renderWithRedux(<App />)
  const avilableLabelElement = getByText(/Available States/i);
  const stateDropdown = getByTestId("state-dd");
  expect(avilableLabelElement).toBeInTheDocument();
  expect(stateDropdown).toBeInTheDocument();
});

test('renders City Dropdown Based on State Selection', async () => {
  // setup
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { "data": [{ "city": "Los Angeles", "state": "CA" }] } })
  );
  renderWithRedux(<App />)
  const stateDropdown = screen.getByTestId("state-dd");

  await fireEvent.change(stateDropdown, { target: { value: "CA" } });

  await wait(() => {
    expect(screen.getByText(/Available Cities/i)).toBeInTheDocument();
    expect(screen.getByTestId("city-dd")).toBeInTheDocument();
  });
});

test('renders Result Pane when you select the state and city', async () => {
  // setup
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { "data": [{ "city": "Los Angeles", "state": "CA" }] } })
  );
  renderWithRedux(<App />)

  // set state as CA
  await fireEvent.change(screen.getByTestId("state-dd"), { target: { value: "CA" } });

  // Waiting for the changes to render when Calling API.
  await wait(() => {
    fireEvent.change(screen.getByTestId("city-dd"), { target: { value: "Los Angeles" } });

    expect(screen.getByTestId("selected-state")).toBeInTheDocument();
    expect(screen.getByTestId("selected-city")).toBeInTheDocument();

    expect(screen.getByTestId("selected-state")).toHaveTextContent('CA');
    expect(screen.getByTestId("selected-city")).toHaveTextContent('Los Angeles');
  });
});
