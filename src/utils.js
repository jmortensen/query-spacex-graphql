import Axios from 'axios';
import get from 'lodash/get';

/**
 * method to create an object that will represent a grpahQL query
 * @param {String} findQueryData - should be a JSON string of search strings
 * @param {int} querylimit - how many items you want to limt the search to
 * @return {Object} - a JSON object which can be sent to a graphQL server
 */
export const createJSONQuery = (findQueryData=null, querylimit=30) => {
    
    // Using string building methods for GraphQL construction will work for simple cases but is not ideal
    // especially since it makes it much harder to modify how much or how little info you want back in your query
    // TODO - implement a more robust system for query generation
    
    let find = findQueryData ? `, find: ${stringifyObjectWithNoQuotes(findQueryData)}` : "";
    const queryTemplate = `{
        launchesPast(limit: ${querylimit}${find}) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            video_link
            mission_patch_small
          }
          rocket {
            rocket_name
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
 * @return {Object} - graphQL JSON results
 */
export const runQuery = async (jsonQuery) => {
    const url = '/api/queryproxy';
    const queryResults = await Axios.post(url, jsonQuery).then(r => { 
        return r.data;
    }).catch(e => {
      throw new Error(`Error during graphQL access`);
    });
    return get(queryResults, ["data", "launchesPast"], []);
};


/**
 * method to format a date string into something a bit more readable
 * @param {String} dateString - a date string that can be parsed by javascript date object
 * @return {String} - formatted date string using usr locale settings
 */
export const getFormattedDate = (dateString) => {
    let date  = new Date(dateString);

    if(date && !isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }

    return dateString;
  };

  /**
   * method to stringify JSON without adding quotes to the keys
   * https://stackoverflow.com/questions/11233498/json-stringify-without-quotes-on-properties
   * @param {Object} obj = simple JSON object
   * @return {string} - JSON turned into a string without double quotes on the keys
   */
  const stringifyObjectWithNoQuotes = (obj) => {
    const json = JSON.stringify(obj);  
    const unquoted = json.replace(/"([^"]+)":/g, '$1:');
    return unquoted;
  }