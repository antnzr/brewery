const Brewery = require("../model/brewery");
const breweryRaw = require('../data/breweryRaw');

module.exports = class BreweryService {

    getBreweries = async () => {
        try {
            let breweries = [];

            await breweryRaw.forEach(brew => {
                breweries.push(Brewery.from(brew));
            });

            return breweries;
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    };

    getBreweriesByState = async state => {
        try {
            const breweries = await this.getBreweries();

            let result = [];
            if (!state) {
                getStates(breweries)
                    .forEach(state => {
                        result.push({[state]: filterByState(state, breweries)});
                    });
            } else {
                result.push({[state]: filterByState(state, breweries)});
            }

            return result;
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    };

    getBreweriesExcludeType = async type => {
        try {
            const breweries = await this.getBreweries();
            const type = type ? type : 'micro';

            return filterExcludeType(type, breweries)
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
};

const filterExcludeType = (type, breweries) => {
    return breweries
        .filter(brewery => brewery.brewery_type.toLowerCase() !== type.toLowerCase());
};


const filterByState = (state, breweries) => {
    return breweries
        .filter(brewery => brewery.state.toLowerCase() === state.toLowerCase());
};

const getStates = breweries => {
    return new Set(breweries.map(brewery => brewery.state));
};
