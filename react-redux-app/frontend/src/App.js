import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actions from './actions';
import './App.css';

const {ddActions, apiActions} = actions;

function App() {
  const dropdownReducerState = useSelector(state => state.dd); // read dropdown states from the store
  const citiesReducerState = useSelector(state => state.cities); // Read Cities from the store

  const {states, selectedCity} = dropdownReducerState;
  const {cities, loaded, selectedState, error} = citiesReducerState;

  const dispatch = useDispatch();

  // intialize the event: Load the states
  useEffect(() => {
    dispatch(ddActions.loadStates());
  }, []);

  const onStateChange = (event) => {
    // trigger backend call...
    apiActions.loadCitiesByState(event.currentTarget.value, dispatch);
    // reset the already selected city value
    dispatch(ddActions.selectCity(''))
  };
  return (
    <div className="App">
      <div>
        <label>Available States</label>
        <select onChange={onStateChange} value={selectedState}>
          <option value='' >Select State</option>
          {states.map((state, index) => (
            <option value={state} key={`state-options-${index}`} >
              {state}
            </option>
          ))}
        </select>
      </div>
      {
        loaded && 
        <div>
          <br /><br />
          <label>Available Cities</label>
          <select onChange={(event) => dispatch(ddActions.selectCity(event.currentTarget.value))}>
            <option>Select Cities</option>
            {cities.map(({city}, index) => (
              <option value={city} key={`city-options-${index}`} >
                {city}
              </option>
            ))}
          </select>
        </div>
      }
      {
        error && 
        <div className='error'>
          {error.message}
        </div>
      }
      {
        !error && selectedState && selectedCity &&
        <div className='selected-container'>
          <label>Selected Country : </label><b>{selectedState}</b> <br/>
          <label>Selected City : </label><b>{selectedCity}</b>
        </div>
      }
    </div>
  );
}

export default App;
