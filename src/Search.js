import React, { useState } from 'react';
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

    const onKeyPressed = e => {
        if (e.key === "Enter") {
            searchClicked();
        }
    };


    return (
        <div className="search-form">
            <div style={{width: "350px"}}>
            <div className="search-form-fields">
                <label><span className="search-form-text-label">Mission</span><input className="search-form-text-input" type="text" value={mission} onChange={e => setMission(e.target.value)} onKeyPress={onKeyPressed}></input></label>
                <label><span className="search-form-text-label">Rocket</span><input className="search-form-text-input" type="text" value={rocket} onChange={e => setRocket(e.target.value)} onKeyPress={onKeyPressed}></input></label>
                <label><span className="search-form-text-label">Year</span><input className="search-form-text-input" type="text" value={launchYear} onChange={e => setLaunchYear(e.target.value)} onKeyPress={onKeyPressed}></input></label>
            </div>
            <div className="search-form-buttons">
                <button className="searchBtn" onClick={searchClicked}><span className="lnr lnr-magnifier"></span>Search</button>
                <button className="searchBtn" onClick={clearClicked} style={{marginLeft: "10px"}}><span className="lnr lnr-cross"></span>Clear</button>
            </div>
            </div>
        </div>
    );
}

export default Search;




