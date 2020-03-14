import React, { useState } from 'react';
import Results from './Results'
import {createJSONQuery} from './utils'
import './App.css';


function App() {
  const [jsonQuery, setJsonQuery] = useState(null);

  const toggleDisplay = () => {
    setJsonQuery(createJSONQuery());
  }

  return (
    <div className="App">
      <div><button onClick={toggleDisplay}>Show Results</button></div>
      <Results jsonQuery={jsonQuery ? jsonQuery: null} />
    </div>
  );
}

export default App;


