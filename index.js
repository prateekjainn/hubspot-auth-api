require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const queryString = require('query-string');
const app = express();

const PORT = process.env.PORT || 4000;
const REDIRECT_URI = `http://localhost:4000/auth`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req,res)=>{
res.send('Hello World');
})
app.get('/auth', (req, res) => {
    const code = req.query.code;
    const API_OAUTH_TOKEN = 'https://api.hubapi.com/oauth/v1/token';
const payload = {
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: REDIRECT_URI,
  client_secret: '1473a794-df85-4c1d-ae22-0edc2ffe37f1',
  client_id: '02e3057a-9494-4e56-a81d-601e0e31cea4',
};

axios
  .post(API_OAUTH_TOKEN, queryString.stringify(payload), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((response) => {
    console.log(response.data); // store it in db
    res.send({ status: 'success', message: 'authenticated' });
  })
  .catch((err) => console.log(err));
});


app.listen(PORT, () => console.log(`listening at port ${PORT}`));
