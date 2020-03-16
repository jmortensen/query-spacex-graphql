import React from 'react';
import {getFormattedDate} from "./utils";
import './ResultCard.css';

const ResultCard = props => {
    const {launch} = props;
    const {mission_name, launch_date_local} = launch
    const {links={}, rocket={}} = launch;
    const {mission_patch_small, video_link} = links;
    const {rocket_name} = rocket;

    return (
        <div className="container">
            <div className="patch-container">
                <img className="patch" src={mission_patch_small} alt="misson patch" /> 
            </div>
        <div className="container-grid">
            <p className="property"><span className="lnr lnr-keyboard icon"></span><span className="property-text">Mission: {mission_name}</span></p>
            <p className="property"><span className="lnr lnr-calendar-full icon"></span><span className="property-text">Launch Date: {getFormattedDate(launch_date_local)}</span></p>
            <p className="property"><span className="lnr lnr-rocket icon"></span><span className="property-text">Rocket Type: {rocket_name}</span></p>
            <p className="property"><span className="lnr lnr-film-play icon"></span><span className="property-text">Video Link: <a className="link" href={video_link}>{video_link}</a></span></p>
        </div>
      </div>
    );
};

export default ResultCard;
