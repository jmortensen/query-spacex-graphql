const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const GRAPH_QUERY_URL = "https://api.spacex.land/graphql" 
const app = express();
 
// parse application/json will make all req.body into JSON
app.use(bodyParser.json())

app.post('/api/queryproxy',  async (req, res) => {    
    
    const queryResponse = await axios({
        method: 'post',
        url: GRAPH_QUERY_URL,
        data: req.body
    }).then(r => {
        return r.data;
    })
    .catch(e => {
        console.log(e);
        res.status(500).json({ error: `Error connecting to ${GRAPH_QUERY_URL}`, errorMessage: e.message});
    });
  
    res.json(queryResponse);
});

app.get('/api/test', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
