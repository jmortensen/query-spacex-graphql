import React, { useState, useEffect } from 'react';
import {runQuery} from './utils'

function Results(props) {
    const {jsonQuery=null} = props;
  
    const [launchList, setLaunchList] = useState([]);
    const [error, setError] = useState();
  
    useEffect(() => {
      if(jsonQuery) {
        const errorCallBack = e => {
          setError(e.error);
        };
        runQuery(jsonQuery, errorCallBack).then(r => {
          setLaunchList(r);
        })
      }
    },[jsonQuery]);
  
    const getFormattedDate = (dateString) => {
      let date  = new Date(dateString);
  
      if(date && !isNaN(date.getTime())) {
        return date.toLocaleDateString();
      }
  
      return dateString;
    };
    
    return (
      <div>
        {error && <div><p>Couldn't load any results</p></div>}
        {launchList.map((launch, index) => 
          <div key={index}>
            <p>{launch.mission_name}</p>
            <p>{getFormattedDate(launch.launch_date_local)}</p>
          </div>
        )}
      </div>
    );
  
  }
  
  export default Results;