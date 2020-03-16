import React, { useState, useEffect } from 'react';
import ResultCard from "./ResultCard";
import {runQuery} from './utils';

function Results(props) {
    const {jsonQuery=null} = props;
  
    const [launchList, setLaunchList] = useState([]);
    const [error, setError] = useState();
  
    useEffect(() => {
      if(jsonQuery) {
        runQuery(jsonQuery).then(r => {
          setLaunchList(r);
        }).catch(e => {
          setError(e.message);
        });
      }
    },[jsonQuery]);
    
    return (
      <div className="result-list">
        {(error || launchList.length == 0) && 
        <div style={{backgroundColor: "white", textAlign: "center"}}>
          <p style={{padding: "5px", color: "red"}}>
            <span className="lnr lnr-cross-circle"></span>
            <span style={{paddingLeft: "5px"}}>No Results</span>
          </p>
        </div>}
        {launchList.map((launch, index) => 
          <ResultCard key={index} launch={launch} />
        )}
      </div>
    );
  
  }
  
  export default Results;