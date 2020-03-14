import Axios from 'axios';
import get from 'lodash/get';

/**
 * method to create an object that will represent a grpahQL query
 * @param {String} findQueryData - should be a JSON string of search strings
 * @param {int} querylimit - how many items you want to limt the search to
 */
export const createJSONQuery = (findQueryData=null, querylimit=15) => {
    // Using string building methods for GraphQL construction will work for simple cases but is not ideal
    // especially since it makes it much harder to modify how much or how little info you want back in your query
    // TODO - implement a more robust system for query generation
    let find = findQueryData ? `, find: ${JSON.stringify(findQueryData)}` : "";
    const queryTemplate = `{
    launchesPast(limit: ${querylimit}${find}) {
        mission_name
        launch_date_local
        launch_site {
        site_name_long
        }
    }
    }`;

    return {
        query: queryTemplate,
        variables: null
    };
};
   
/**
 * method to query the graphQL service through a proxy url
 * @param {Object} jsonQuery - this is an object that represents the graphQL query
 * @param {function} onError - call back to define what happens on error
 * @return {Object} - graphQL JSON results
 */
export const runQuery = async (jsonQuery, onError) => {
    const url = '/api/queryproxy';
    const queryResults = await Axios.post(url, jsonQuery).then(r => { 
        return r.data;
    }).catch(e => {
    if(onError) {
        onError(e);  
    }
    });
    return get(queryResults, ["data", "launchesPast"], []);
};