const router =  require('express').Router();
const axios = require('axios');

const film_url = 'https://swapi.co/api/films/';
const title_name = 'The Phantom Menace';

router.get('/getAll', function(request, response){
    axios.get(film_url)
        .then(resp => {
            response.send(resp.data);
        });
});


router.get('/get-by-title', function(request, response){
    axios.get(film_url)
        .then(resp => {
           const data =  resp.data.results;
           const film = data.filter((e) =>  e.title === title_name);
           response.send(film);           
        });
});

module.exports = router;