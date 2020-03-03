import React, {useEffect} from 'react';
import {connect} from "react-redux";

function ResultPane({selectedState, selectedCity}) {
  return (
    <div className='selected-container'>
          <label>Selected Country : </label><b data-testid="selected-state" >{selectedState}</b> <br/>
          <label>Selected City : </label><b data-testid="selected-city" >{selectedCity}</b>
    </div>
  );
};

function mapStateToProps(state) {
    const {dd: {selectedCity}, cities: {selectedState}} = state;

    return {
        selectedCity,
        selectedState
    };
};

export default connect(mapStateToProps)(ResultPane);
