import axios from 'axios';
import * as config from './config';

async function getResults(query) {
    try {
        const res = await axios(`${config.crossOrigin}${config.url}?key=${config.key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (error) {
        console.log(error);
    }

}
getResults('pizza');