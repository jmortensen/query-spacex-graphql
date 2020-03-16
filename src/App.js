import React, { useState } from 'react';
import Search from './Search';
import Results from './Results';
import {createJSONQuery} from './utils';
import './App.css';


function App() {
  const [jsonQuery, setJSONQuery] = useState(createJSONQuery());

  const toggleDisplay = (data={}) => {
    const {mission="", rocket="", launchYear=""} = data;
    const newQueryProps = {launch_year: launchYear, mission_name: mission, rocket_name: rocket};
    const newJSONQuery = createJSONQuery(newQueryProps);
    if(JSON.stringify(jsonQuery) != JSON.stringify(newJSONQuery)) {
      console.log("should set new query");
      setJSONQuery(newJSONQuery);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="header-text">Search SpaceX Launches</h1>
        </div>
      <Search onSearch={toggleDisplay} />
      <Results jsonQuery={jsonQuery ? jsonQuery: null} />
    </div>
  );
}

export default App;


