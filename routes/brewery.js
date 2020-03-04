const express = require('express');
const BreweryService = require('../service/breweryService');


const service = new BreweryService();
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Brewery'});
});

router.get('/states/:state?', (req, res) => {
    const state = req.params.state;
    const title = state ? `${state}'s breweries` : `All breweries grouped by state`;

    service.getBreweriesByState(state)
        .then(breweries => {
            res.render('states', {
                title: `${title}`,
                breweries
            })
        });
});

router.get('/exclude/:type?', (req, res) => {
    service.getBreweriesExcludeType(req.params.type)
        .then(breweries => {
            res.render('type', {
                title: `Breweries`,
                breweries
            })
        })
});

module.exports = router;