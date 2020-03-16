import React, { useState, useEffect } from 'react';
import './Search.css';

const Search = props => {
    const {onSearch} = props;
    const [mission, setMission] = useState("");
    const [rocket, setRocket] = useState("");
    const [launchYear, setLaunchYear] = useState("");

    const searchClicked = () => {
        if (onSearch) {
            const queryObject = {
                mission,
                rocket,
                launchYear
            };
            onSearch(queryObject);
        }
    };

    const clearClicked = () => {
        setMission("");
        setRocket("");
        setLaunchYear("");
        onSearch({}); 
    };

    const onMissionChanged = (e) => {
        setMission(e.target.value);
    };

    const onRockectChanged = (e) => {
        setRocket(e.target.value);
    };

    const onLaunchYearChanged = (e) => {
        setLaunchYear(e.target.value);
    };

    return (
        <div className="search-form">
            <div style={{width: "350px"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems:"center", backgroundColor: "white"}}>
                <label><span className="search-form-text-label">Mission</span><input className="search-form-text-input" type="text" value={mission} onChange={onMissionChanged}></input></label>
                <label><span className="search-form-text-label">Rocket</span><input className="search-form-text-input" type="text" value={rocket} onChange={onRockectChanged}></input></label>
                <label><span className="search-form-text-label">Year</span><input className="search-form-text-input" type="text" value={launchYear} onChange={onLaunchYearChanged}></input></label>
            </div>
            <div style={{display: "flex", justifyContent: "center", backgroundColor: "white", paddingTop:"10px", paddingBottom: "10px"}}>
                <button className="searchBtn" onClick={searchClicked}><span className="lnr lnr-magnifier"></span>Search</button>
                <button className="searchBtn" onClick={clearClicked} style={{marginLeft: "10px"}}><span className="lnr lnr-cross"></span>Clear</button>
            </div>
            </div>
        </div>
    );
}

export default Search;




