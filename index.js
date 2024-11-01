const PORT = 8000
const axios = require('axios');
const express = require("express")
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())

app.get('/word',(req,res) => {
    const options = {
      method: 'GET',
      url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
      params: {
        count: '5',
        wordLength: '5'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    };
    
    try {
        axios.request(options).then((response) => {
            console.log(response.data);
            res.json(response.data[0])
        })
    } catch (error) {
        console.error(error);
    }
    
})

app.get('/check',(req,res) => {
    const currword = req.query.currword
    // console.log(req)
    const options = {
      method: 'GET',
      url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
      params: {word: currword},
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
      }
    };
    
    try {
        axios.request(options).then((response) =>{
            console.log(response.data);
            res.json(response.data.valid)
        })
    } catch (error) {
        console.error(error);
    }
})


app.listen(PORT, () => console.log('Server started on port '+PORT))


